import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// เปิดให้ client ต่าง origin (เช่น React บน port 5173) ยิงเข้ามาคุยกับ API ได้
app.use(cors());

// แปลง incoming request body ที่ส่งมาเป็น JSON ให้อยู่ในรูป req.body พร้อมใช้งาน
app.use(express.json());

// Custom middleware: จด log ทุกครั้งที่มี request เข้ามา จะได้รู้ว่าใครยิง method ไหนมาตอนกี่โมง
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString("th-TH");
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// เก็บข้อมูลจำลองไว้ใน memory ก่อน เพราะโจทย์ระบุว่าไม่ต้องต่อ database
let products = [
  {
    id: "1710000001",
    name: "Wireless Mechanical Keyboard",
    price: 2490,
    quantity: 5,
  },
  {
    id: "1710000002",
    name: "Ergonomic Gaming Mouse",
    price: 1290,
    quantity: 8,
  },
  {
    id: "1710000003",
    name: "USB-C Multiport Adapter",
    price: 890,
    quantity: 12,
  },
  {
    id: "1710000004",
    name: "Monitor Light Bar",
    price: 1590,
    quantity: 3,
  },
];

// หน้าแรกเช็คสถานะการทำงานของ server
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Shopping Cart API Server is running",
    endpoints: {
      getAll: "GET /products",
      getOne: "GET /products/:id",
      create: "POST /products",
      update: "PUT /products/:id",
      delete: "DELETE /products/:id",
    },
  });
});

// 1. GET /products: ดึงสินค้าทั้งหมด พร้อมรองรับ query filter และ sort
app.get("/products", (req, res) => {
  const { search, sortBy, order } = req.query;
  let result = [...products];

  // ถ้ามี query ?search=... ให้ค้นหาจากชื่อสินค้า (ตัดเรื่องพิมพ์เล็กพิมพ์ใหญ่)
  if (search) {
    const keyword = search.trim().toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(keyword));
  }

  // ถ้ามี query ?sortBy=price ให้เรียงตามราคา
  if (sortBy === "price") {
    const isAsc = order === "asc";
    result.sort((a, b) => (isAsc ? a.price - b.price : b.price - a.price));
  }

  res.status(200).json(result);
});

// 2. GET /products/:id: ดึงสินค้าชิ้นเดียวตาม id
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: `Product with id '${id}' not found`,
    });
  }

  res.status(200).json(product);
});

// 3. POST /products: เพิ่มสินค้าใหม่เข้าตะกร้า
app.post("/products", (req, res) => {
  const { name, price, quantity } = req.body;

  // ตรวจสอบข้อมูลบังคับก่อนบันทึก
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      message: "Validation Error: 'name' is required and must not be empty",
    });
  }

  if (price === undefined || price === null || isNaN(Number(price)) || Number(price) < 0) {
    return res.status(400).json({
      message: "Validation Error: 'price' is required and must be a valid positive number",
    });
  }

  // ถ้าไม่ระบุ quantity ให้ fallback เป็น 1 ตาม requirement
  const parsedQuantity =
    quantity !== undefined && !isNaN(Number(quantity)) && Number(quantity) > 0
      ? Math.floor(Number(quantity))
      : 1;

  const newProduct = {
    id: String(Date.now()), // gen id ไม่ซ้ำด้วย timestamp แบบ string
    name: name.trim(),
    price: Number(price),
    quantity: parsedQuantity,
  };

  products.push(newProduct);

  // คืน 201 Created เมื่อสร้าง resource สำเร็จ
  res.status(201).json(newProduct);
});

// 4. PUT /products/:id: แก้ไขข้อมูลสินค้าที่มีอยู่เดิม
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({
      message: `Product with id '${id}' not found`,
    });
  }

  // Validate ฟิลด์ที่ส่งเข้ามาแก้ไข
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        message: "Validation Error: 'name' cannot be empty",
      });
    }
    products[index].name = name.trim();
  }

  if (price !== undefined) {
    if (isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json({
        message: "Validation Error: 'price' must be a valid positive number",
      });
    }
    products[index].price = Number(price);
  }

  if (quantity !== undefined) {
    if (isNaN(Number(quantity)) || Number(quantity) < 1) {
      return res.status(400).json({
        message: "Validation Error: 'quantity' must be at least 1",
      });
    }
    products[index].quantity = Math.floor(Number(quantity));
  }

  res.status(200).json(products[index]);
});

// 5. DELETE /products/:id: ลบสินค้าออกจากตะกร้า
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: `Product with id '${id}' not found`,
    });
  }

  const [deletedProduct] = products.splice(index, 1);

  res.status(200).json({
    message: "Product deleted successfully",
    deletedProduct,
  });
});

// 404 Handler สำหรับ route ที่ไม่มีอยู่จริง
app.use((req, res) => {
  res.status(404).json({
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found`,
  });
});

// Error-handling middleware ประจำการท้ายสุดของ chain เพื่อดักจับข้อผิดพลาดที่ไม่คาดคิด
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
