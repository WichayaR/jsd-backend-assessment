# Backend Assessment
**ผู้จัดทำ:** 47_Wichayaporn (Heinz / ไฮน์)  
โปรเจกต์นี้เป็นการพัฒนา Fullstack Shopping Cart Management ตามโจทย์ Assessment โดยสร้าง **Express.js (REST API)** และ **React (Vite)** เชื่อมต่อข้อมูลกันแบบครบวงจรและรันแบบ Local ทั้งหมดค่ะ

---

## Project Structure

```
jsd-backend-assessment/
├── server/                 # Express Backend API (Port 3000)
│   ├── index.js            # Main server, CRUD routes & middleware
│   ├── requests.http       # REST Client test script
│   ├── package.json
│   └── test-api.js         # Automated end-to-end test script
├── client/                 # React Frontend App (Port 5173)
│   ├── src/
│   │   ├── App.jsx         # Admin Dashboard UI & React State Management
│   │   ├── App.css         # Styling สะอาดตา สไตล์ Minimalist
│   │   └── main.jsx
│   ├── .env                # VITE_API_URL=http://localhost:3000
│   └── package.json
├── screenshots/            # ภาพหน้าจอระบบ Admin Dashboard
│   └── admin-dashboard.png
├── my-understanding.md     # บันทึกความเข้าใจและการประเมินการใช้ AI (โดย ไฮน์)
└── README.md
```

---

## ขั้นตอนการติดตั้งและรันโปรเจกต์ (Getting Started)

โปรเจกต์นี้แยกการทำงานออกเป็น 2 ส่วนอิสระ จึงต้องเปิด **2 Terminal** ควบคู่กันนะคะ

### 1. ฝั่ง Backend (`server/`)

เปิด Terminal ที่ 1:
```bash
cd server
npm install
npm run dev
```
- Server จะเริ่มทำงานบน: `http://localhost:3000`
- รันด้วยคำสั่ง `node --watch index.js` จึงรีโหลดให้อัตโนมัติเมื่อมีการแก้ไขโค้ดค่ะ

**การทดสอบ API ฝั่ง Server:**
- เปิดไฟล์ [server/requests.http](file:///c:/Users/wicha/Desktop/JSD13/week-11/jsd-backend-assessment/server/requests.http) แล้วใช้ extension **REST Client** ใน VS Code เพื่อกด Send Request ทดสอบได้โดยตรง
- หรือรัน Automated Test สรุปผลผ่าน terminal:
  ```bash
  npm test
  ```

---

### 2. ฝั่ง Frontend (`client/`)

เปิด Terminal ที่ 2:
```bash
cd client
npm install
npm run dev
```
- React App จะเริ่มทำงานบน: `http://localhost:5173`
- เปิดเบราว์เซอร์ไปที่ `http://localhost:5173` เพื่อเข้าใช้งาน Admin Dashboard ได้เลยค่ะ

---

## API Endpoints (CRUD)

| Method | Route | คำอธิบาย | Status Codes |
|---|---|---|---|
| `GET` | `/products` | ดึงสินค้าทั้งหมดจาก in-memory array | `200` |
| `GET` | `/products/:id` | ดึงข้อมูลสินค้าชิ้นเดียวตาม id | `200`, `404` |
| `POST` | `/products` | เพิ่มสินค้าใหม่ (จำเป็นต้องมี `name`, `price`) | `201`, `400` |
| `PUT` | `/products/:id` | แก้ไขข้อมูลสินค้าเดิมตาม id | `200`, `400`, `404` |
| `DELETE` | `/products/:id` | ลบสินค้าออกจากระบบ | `200`, `404` |

---

## ฟีเจอร์การทำงานของหน้าเว็บ (Frontend Features)

- **Synchronized State**: เพิ่ม, แก้ไข, หรือลบสินค้าแล้วหน้าจออัปเดตผ่าน React State ทันที ไม่ต้องรีเฟรชหน้าเว็บค่ะ
- **Loading & Error Handling**: มีข้อความแจ้งเตือนขณะกำลังดึงข้อมูล และมี Error Box สีแดงแจ้งเตือนพร้อมปุ่มให้ลองใหม่หาก Server ไม่ได้เปิดอยู่
- **Inline Editing**: กดปุ่มแก้ไขแล้วสามารถแก้ไขชื่อ, ราคา, และจำนวนได้โดยตรงในตาราง พร้อมปุ่มบันทึกและยกเลิก
- **Live Calculation**: คำนวณมูลค่ารวมของสินค้าแต่ละแถวให้อัตโนมัติค่ะ
