import { useState, useEffect } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state สำหรับเพิ่มสินค้า
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [formError, setFormError] = useState("");

  // State สำหรับโหมดแก้ไขสินค้า
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("1");
  const [editError, setEditError] = useState("");

  // ดึงข้อมูลสินค้าจาก Express server
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) {
        throw new Error(`Server status: ${res.status}`);
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 1. เพิ่มสินค้าใหม่ (POST /products)
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("กรุณากรอกชื่อสินค้า");
      return;
    }
    if (!price || Number(price) <= 0) {
      setFormError("กรุณากรอกราคาที่มากกว่า 0");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          price: Number(price),
          quantity: Number(quantity) || 1,
        }),
      });

      const newProduct = await res.json();
      if (!res.ok) {
        throw new Error(newProduct.message || "Failed to add product");
      }

      // อัปเดต state ทันที ไม่ต้อง reload หน้าเว็บ
      setProducts((prev) => [...prev, newProduct]);
      setName("");
      setPrice("");
      setQuantity("1");
    } catch (err) {
      setFormError(err.message);
    }
  };

  // 2. เริ่มแก้ไขสินค้า
  const handleStartEdit = (product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(String(product.price));
    setEditQuantity(String(product.quantity));
    setEditError("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditError("");
  };

  // 3. บันทึกการแก้ไข (PUT /products/:id)
  const handleSaveEdit = async (id) => {
    setEditError("");

    if (!editName.trim()) {
      setEditError("ชื่อสินค้าต้องไม่ว่างเปล่า");
      return;
    }
    if (!editPrice || Number(editPrice) <= 0) {
      setEditError("ราคาต้องมากกว่า 0");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName.trim(),
          price: Number(editPrice),
          quantity: Number(editQuantity) || 1,
        }),
      });

      const updated = await res.json();
      if (!res.ok) {
        throw new Error(updated.message || "Failed to update");
      }

      // อัปเดตเฉพาะตัวที่ถูกแก้ใน state
      setProducts((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
      setEditingId(null);
    } catch (err) {
      setEditError(err.message);
    }
  };

  // 4. ลบสินค้า (DELETE /products/:id)
  const handleDeleteProduct = async (id, productName) => {
    if (!window.confirm(`ต้องการลบ "${productName}" ใช่หรือไม่?`)) return;

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete");
      }

      // เอาสินค้าที่ลบออกจาก state
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Admin Dashboard</h1>
        <p className="subtext">Backend Assessment - 47_Wichayaporn(Heinz/ไฮน์)</p>
      </header>

      {/* Error State */}
      {error && (
        <div className="error-box">
          <p><strong>เกิดข้อผิดพลาด:</strong> {error}</p>
          <small>เซิร์ฟเวอร์ Express (port 3000) รันอยู่หรือไม่?</small>
          <button onClick={fetchProducts} className="btn-retry">ลองใหม่</button>
        </div>
      )}

      {/* ฟอร์มเพิ่มสินค้า */}
      <section className="card form-section">
        <h2>เพิ่มสินค้าใหม่</h2>
        {formError && <p className="error-text">{formError}</p>}
        <form onSubmit={handleAddProduct} className="add-form">
          <div className="form-group">
            <label>ชื่อสินค้า</label>
            <input
              type="text"
              placeholder="เช่น Mechanical Keyboard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>ราคา (บาท)</label>
              <input
                type="number"
                placeholder="เช่น 2490"
                min="0"
                step="any"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>จำนวน</label>
              <input
                type="number"
                placeholder="1"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-submit">+ เพิ่มสินค้า</button>
        </form>
      </section>

      {/* รายการสินค้า */}
      <section className="card list-section">
        <div className="list-header">
          <h2>รายการสินค้าในตะกร้า ({products.length})</h2>
        </div>

        {loading ? (
          <p className="status-text">กำลังโหลดข้อมูลสินค้า...</p>
        ) : products.length === 0 ? (
          <p className="status-text">ยังไม่มีสินค้าในตะกร้า</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>ชื่อสินค้า</th>
                <th className="text-right">ราคา</th>
                <th className="text-center">จำนวน</th>
                <th className="text-right">ยอดรวม</th>
                <th className="text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                const isEditing = editingId === item.id;

                if (isEditing) {
                  return (
                    <tr key={item.id} className="editing-row">
                      <td>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="edit-input"
                        />
                        {editError && <span className="error-text">{editError}</span>}
                      </td>
                      <td className="text-right">
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="edit-input-num text-right"
                          min="0"
                        />
                      </td>
                      <td className="text-center">
                        <input
                          type="number"
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(e.target.value)}
                          className="edit-input-num text-center"
                          min="1"
                        />
                      </td>
                      <td className="text-right">
                        ฿{((Number(editPrice) || 0) * (Number(editQuantity) || 1)).toLocaleString()}
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(item.id)}
                          className="btn-save"
                        >
                          บันทึก
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="btn-cancel"
                        >
                          ยกเลิก
                        </button>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td className="text-right">฿{Number(item.price).toLocaleString()}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-right">
                      ฿{(Number(item.price) * Number(item.quantity)).toLocaleString()}
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(item)}
                        className="btn-edit"
                      >
                        แก้ไข
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(item.id, item.name)}
                        className="btn-delete"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
