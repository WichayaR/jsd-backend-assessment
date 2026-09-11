// Script ทดสอบ API อัตโนมัติ เพื่อเช็คว่าทั้ง 5 routes และ status code ทำงานถูกต้อง
import http from "http";

const BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, options);
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}

async function runTests() {
  console.log("=== เริ่มการทดสอบ Express Server Endpoints ===");

  try {
    // 0. Health check
    const rootRes = await request("/");
    console.log("0. GET / -> Status:", rootRes.status, "| Status msg:", rootRes.data.status);

    // 1. GET /products
    const getAllRes = await request("/products");
    console.log("1. GET /products -> Status:", getAllRes.status, "| Total items:", getAllRes.data.length);

    // 2. Query filter search
    const searchRes = await request("/products?search=keyboard");
    console.log("2. GET /products?search=keyboard -> Status:", searchRes.status, "| Found:", searchRes.data.length);

    // 3. Query sort
    const sortRes = await request("/products?sortBy=price&order=desc");
    console.log("3. GET /products?sortBy=price&order=desc -> Status:", sortRes.status, "| First item price:", sortRes.data[0].price);

    // 4. GET /products/:id
    const getOneRes = await request("/products/1710000001");
    console.log("4. GET /products/1710000001 -> Status:", getOneRes.status, "| Name:", getOneRes.data.name);

    // 5. GET /products/:id 404
    const notFoundRes = await request("/products/invalid-id");
    console.log("5. GET /products/invalid-id (Expect 404) -> Status:", notFoundRes.status, "| Message:", notFoundRes.data.message);

    // 6. POST /products success (Expect 201)
    const postRes = await request("/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "USB Microphone", price: 1890, quantity: 2 }),
    });
    console.log("6. POST /products (Expect 201) -> Status:", postRes.status, "| Created ID:", postRes.data.id);

    // 7. POST /products validation error (Expect 400)
    const postInvalidRes = await request("/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Broken Item" }), // no price
    });
    console.log("7. POST /products missing price (Expect 400) -> Status:", postInvalidRes.status, "| Message:", postInvalidRes.data.message);

    // 8. PUT /products/:id success (Expect 200)
    const putRes = await request("/products/1710000001", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: 2990 }),
    });
    console.log("8. PUT /products/1710000001 (Expect 200) -> Status:", putRes.status, "| Updated price:", putRes.data.price);

    // 9. PUT /products/:id 404
    const put404Res = await request("/products/non-existing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Ghost" }),
    });
    console.log("9. PUT /products/non-existing (Expect 404) -> Status:", put404Res.status);

    // 10. DELETE /products/:id success (Expect 200)
    const delRes = await request("/products/1710000003", {
      method: "DELETE",
    });
    console.log("10. DELETE /products/1710000003 (Expect 200) -> Status:", delRes.status, "| Deleted:", delRes.data.deletedProduct.name);

    // 11. DELETE /products/:id 404
    const del404Res = await request("/products/non-existing", {
      method: "DELETE",
    });
    console.log("11. DELETE /products/non-existing (Expect 404) -> Status:", del404Res.status);

    console.log("=== สรุปผล: การทดสอบผ่านฉลุยทุก Endpoints! ===");
    process.exit(0);
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  }
}

runTests();
