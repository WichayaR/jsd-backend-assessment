# Fullstack Integration Assessment Brief (ภาษาไทย)

## โจทย์ของงาน (The Task)

สร้าง REST API สำหรับ shopping cart โดยใช้ **Express.js** และสร้างแอป **React** ที่คุยกับ API นี้

API ของคุณจะจัดการ list ของ `products` ส่วนแอป React จะให้ผู้ใช้ดู เพิ่ม แก้ไข และลบ products เหล่านั้นผ่านหน้าเว็บ — โดยการเรียก API ของคุณจริง ๆ ไม่ใช่การ fake ข้อมูลไว้ใน frontend เฉย ๆ

เมื่อทำ assessment นี้เสร็จ คุณควรมี Express server และแอป React ที่รันคู่กันได้บนเครื่องของคุณ และคุณควรอธิบายได้ว่าข้อมูลเดินทางไปมาระหว่างสองฝั่งนี้อย่างไรและทำไมถึงทำงานแบบนั้น

Assessment นี้ทำงานแบบ **local ทั้งหมด** ไม่มีขั้นตอน deployment คุณไม่จำเป็นต้อง host ทั้ง API และแอป React ไว้ที่ไหนเลย ทุกอย่างจะถูก demo โดยการรันทั้งสองแอปบน `localhost`

---

## หมายเหตุเกี่ยวกับ AI Tools

คุณสามารถใช้ AI tools ได้อย่างอิสระ (ChatGPT, Claude, Copilot ฯลฯ) นี่ไม่ใช่ memory test

สิ่งที่ assessment นี้วัดคือ **ความเข้าใจ** ของคุณ คุณต้องอธิบายโค้ดของตัวเองได้ และให้เหตุผลได้ผ่านคำตอบที่เขียนไว้ใน `my-understanding.md` ถ้าคุณใช้ AI สร้างอะไรบางอย่างที่คุณไม่เข้าใจ มันจะเห็นได้ชัดจากคำตอบที่คุณเขียน

วิธีที่ดีที่สุดคือ ใช้ AI เป็นเครื่องมือช่วยเรียนรู้ ไม่ใช่ shortcut ลองให้ AI ช่วยอธิบายสิ่งต่าง ๆ แทนที่จะให้มันสร้างโค้ดให้เฉย ๆ

**คุณจะต้อง rate การใช้ AI ของตัวเองด้วย** ที่ด้านบนของ `my-understanding.md` จะมี **AI Code Contribution Scale** (0–5 ตั้งแต่ "ไม่ได้ใช้ AI เลย" ไปจนถึง "AI สร้างโค้ดให้ แต่เข้าใจอย่างจำกัด") เลือกตัวเลขที่ตรงกับสิ่งที่คุณทำจริง ๆ อย่างตรงไปตรงมา — ตัวเลขที่เลือกไม่ถูกให้คะแนนโดยตรง ดังนั้นไม่มีประโยชน์ที่จะพูดน้อยกว่าหรือมากกว่าความจริง สิ่งที่ถูกประเมินคือ rating ของคุณตรงกับความจริงและสอดคล้องกับโค้ด/คำตอบของคุณหรือไม่ และไม่ว่าคุณจะใช้ AI มากแค่ไหน คุณ direct และ verify มันอย่างมีเหตุผลหรือแค่รับมาเฉย ๆ ถ้าคุณเลือก 2 ขึ้นไป คุณจะต้องตอบคำถามเพิ่มเติมสั้น ๆ เกี่ยวกับ process การใช้ AI ของคุณด้วย — ดูได้ใน `my-understanding.md`

---

## สิ่งที่คุณกำลังสร้าง (What You Are Building)

### 1. Express API (`server/`)

| Method | Route | คำอธิบาย |
|---|---|---|
| GET | `/products` | คืนค่า products ทั้งหมด |
| GET | `/products/:id` | คืนค่า product เดียวตาม ID |
| POST | `/products` | เพิ่ม product ใหม่ |
| PUT or PATCH | `/products/:id` | แก้ไข product ที่มีอยู่แล้ว |
| DELETE | `/products/:id` | ลบ product |

#### The Product

แต่ละ product ควรมี field อย่างน้อยดังนี้:

| Field | Type | หมายเหตุ |
|---|---|---|
| `id` | string | ถูกสร้างขึ้นตอนที่ product ถูกสร้าง (เช่น `String(Date.now())`) |
| `name` | string | จำเป็นต้องมี (Required) |
| `price` | number | จำเป็นต้องมี (Required) |
| `quantity` | number | จำเป็นต้องมี (Required), ค่า default คือ `1` |

### 2. แอป React (`client/`)

แอป React ที่สร้างขึ้นเองตั้งแต่ต้น (from scratch) ที่คุยกับ API ของคุณผ่าน `fetch` (หรือ `axios`) — ไม่ใช่ list ที่ hardcode ไว้แบบ static เมื่อข้อมูลบน server เปลี่ยน การ refresh แอป React ควรแสดงข้อมูลใหม่ที่เปลี่ยนไป

อย่างน้อยที่สุด แอปควรให้ผู้ใช้ทำสิ่งเหล่านี้ได้:

- ดู list ของ products ทั้งหมด (fetch มาจาก `GET /products` ตอนแอป load)
- เพิ่ม product ใหม่ผ่านฟอร์ม (เรียก `POST /products`)
- แก้ไข product ที่มีอยู่ (เรียก `PUT`/`PATCH /products/:id`)
- ลบ product (เรียก `DELETE /products/:id`)

list ที่แสดงบนหน้าจอควรอัปเดตหลังจากแต่ละ action เหล่านี้ **โดยไม่ต้อง refresh หน้าเว็บเอง** — พูดอีกแบบคือ component state ของคุณต้อง sync กับสิ่งที่ API เพิ่งทำไป

---

## Requirements

### Core Backend (ทุกคนต้องทำ)

- [ ] สร้าง Express server และ listen บน port
- [ ] ใช้ `node --watch` ในการรัน server (ไม่จำเป็นต้องใช้ nodemon)
- [ ] ใช้ middleware `express.json()`
- [ ] เปิดใช้งาน CORS เพื่อให้แอป React ที่รันอยู่คนละ port เรียก API ได้ (เช่น package `cors`)
- [ ] implement ครบทั้ง 5 routes (GET all, GET one, POST, PUT/PATCH, DELETE)
- [ ] ใช้ route parameters ในการระบุ product (`/products/:id`)
- [ ] รองรับ query string อย่างน้อย 1 แบบ (เช่น filter ตามชื่อ หรือ sort ตามราคา)
- [ ] เก็บ products ไว้ใน in-memory array (ไม่ต้องใช้ database)
- [ ] คืนค่า HTTP status codes ที่ถูกต้อง (200, 201, 400, 404)
- [ ] เขียน custom middleware อย่างน้อย 1 ตัว (เช่น request logger)
- [ ] มี error handling middleware อยู่ท้าย middleware chain
- [ ] คืน error message ที่มีความหมายเมื่อเกิดข้อผิดพลาด

### Core Frontend (ทุกคนต้องทำ)

- [ ] สร้างแอป React ขึ้นเองตั้งแต่ต้น (แนะนำ Vite: `npm create vite@latest client -- --template react`)
- [ ] fetch product list จาก `GET /products` และ render ตอน load (เช่น ใช้ `useEffect` + `useState`)
- [ ] แสดง loading state ระหว่างที่ fetch ครั้งแรกกำลังทำงานอยู่
- [ ] แสดง error state ถ้า fetch ล้มเหลว (เช่น server ไม่ได้รันอยู่) — แอปไม่ควร break แบบเงียบ ๆ
- [ ] มีฟอร์มสำหรับเพิ่ม product ใหม่ที่เรียก `POST /products` และอัปเดต list บนหน้าจอเมื่อสำเร็จ
- [ ] มีวิธีแก้ไข product ที่มีอยู่ ซึ่งเรียก `PUT`/`PATCH /products/:id` และอัปเดต list บนหน้าจอ
- [ ] มีวิธีลบ product ที่เรียก `DELETE /products/:id` และเอา product นั้นออกจาก list บนหน้าจอ
- [ ] เก็บ API base URL ไว้ที่เดียว (เช่นไฟล์ `.env` ที่มี `VITE_API_URL`) ไม่ hardcode ไว้ในทุก fetch call
- [ ] ไม่ใช้การ reload หน้าเว็บเพื่อ "refresh" ข้อมูลหลังทำ action ใด ๆ — ให้ update state ผ่าน React

### Stretch (ถ้าทำเสร็จก่อนเวลา)

- [ ] เชื่อมต่อ API กับ database **MongoDB Atlas** และ persist products ไว้ที่นั่น
- [ ] validate ข้อมูลที่ส่งเข้ามาฝั่ง server — reject field ที่ขาดหรือไม่ถูกต้องด้วย response 400 แล้วแสดง error message นั้นใน React UI
- [ ] ย้าย Express routes ไปไว้ในไฟล์แยกโดยใช้ `express.Router()`
- [ ] เพิ่ม search/sort controls ฝั่ง client ใน React ที่ส่งเป็น query strings ไปยัง API (เชื่อมโยงกับ query-string requirement ด้านบน)
- [ ] เพิ่มหน้า product detail page โดยใช้ React Router (เช่น `/products/:id`)
- [ ] เพิ่ม optimistic UI updates เบื้องต้น (update หน้าจอก่อนที่ response จาก API จะกลับมา แล้วค่อย reconcile ทีหลัง)

---

## Folder Structure

นี่คือ GitHub repository **เดียว** ที่มีทั้งสองแอปอยู่ด้วยกัน คุณไม่จำเป็นต้องใช้ npm/pnpm/yarn workspaces — แค่แยกเป็น 2 folder อิสระจากกัน แต่ละอันมี `package.json` ของตัวเอง และรันคนละ terminal

### Core

```
your-project/
├── client/
│   ├── src/
│   │   └── ... (React components ของคุณ)
│   ├── .env
│   └── package.json
├── server/
│   ├── index.js
│   └── package.json
├── my-understanding.md
└── README.md
```

### With stretch goals

```
your-project/
├── client/
│   ├── src/
│   └── package.json
├── server/
│   ├── index.js
│   ├── routes/
│   │   └── products.js
│   ├── models/
│   │   └── Product.js
│   └── package.json
├── my-understanding.md
└── README.md
```

---

## Tooling

**การรัน server ของคุณ**
```bash
cd server
node --watch index.js
```

**การรันแอป React ของคุณ** (ใน terminal ที่สอง)
```bash
cd client
npm run dev
```

ทั้งสองต้องรันพร้อมกันเพื่อให้แอปทำงานได้ — server อยู่ที่ port หนึ่ง (เช่น `3000`) ส่วน React dev server อยู่ที่อีก port หนึ่ง (เช่น `5173`) นี่คือเหตุผลว่าทำไมต้อง config CORS บน server เพราะ browser มองว่าทั้งสองนี้เป็นคนละ origin กัน

**การ test API routes ของคุณโดยตรง**

ใช้ [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VS Code extension เพื่อ test routes ของคุณแยกจาก frontend โดยเฉพาะระหว่างที่กำลัง build อยู่ สร้างไฟล์ชื่อ `requests.http` ไว้ใน `server/` แล้วเขียน request ของคุณไว้ที่นั่น หรือใช้ Postman ก็ได้ถ้าถนัดกว่า

ตัวอย่าง `requests.http`:
```http
### Get all products
GET http://localhost:3000/products

### Add a product
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Keyboard",
  "price": 49.99,
  "quantity": 1
}
```

การ test routes แบบนี้ก่อน — ก่อนที่จะเชื่อมกับ React — จะทำให้บอกได้ง่ายขึ้นมากว่า bug อยู่ฝั่ง server หรือฝั่ง client

---

## Submission

นี่คือสิ่งที่ต้องเตรียมและส่งไปที่ไหนบ้าง:

### 1. GitHub Repository — ใส่ link ใน Google Sheet
Push โปรเจกต์ของคุณ (ทั้ง `client/` และ `server/`) ขึ้น GitHub repository เดียวที่เป็น **public** แล้วนำ link ไปวางใน Google Sheet ที่ instructor เตรียมไว้ให้

> repo ต้องตั้งเป็น **public** — repo แบบ private จะ review ไม่ได้

> อย่าลืม exclude `node_modules/` ผ่าน `.gitignore` ทั้งใน `client/` และ `server/`

### 2. README.md — อยู่ที่ root ของ GitHub repo
README สั้น ๆ อธิบายวิธี run โปรเจกต์แบบ local: วิธี install dependencies และ start ทั้ง server และ client รวมถึง port ที่แต่ละฝั่งรันอยู่

### 3. my-understanding.md — อยู่ที่ root ของ GitHub repo
ใช้ `MY_UNDERSTANDING_TEMPLATE.md` เป็นจุดเริ่มต้น — copy ไฟล์นั้นเข้าไปในโปรเจกต์ของคุณ เปลี่ยนชื่อเป็น `my-understanding.md` แล้วตอบทุกคำถามด้วยคำพูดของคุณเอง รวมถึง rate ตัวเองบน **AI Code Contribution Scale** ที่ด้านบน และถ้า rate ไว้ 2 ขึ้นไป ให้ตอบ AI process questions ที่ท้ายเอกสารด้วย

เขียนเหมือนกำลังอธิบายให้เพื่อนฟัง อย่า copy จาก documentation หรือ AI output ส่วนนี้คือจุดที่ความเข้าใจของคุณจะถูกประเมินจริง ๆ ดังนั้นให้ทำอย่างตั้งใจ — เพราะไม่มีวิดีโอให้พึ่งพาแล้ว

---

## Tips

- **ทำให้ server ทำงานได้และ test ผ่าน REST Client ก่อน แล้วค่อยแตะ React** การ debug fetch call กับ server ที่คุณยังไม่ได้ verify เองนั้นยากกว่าการ debug server โดยตรงมาก
- **build ทีละ feature ให้ครบวงจร (full slice)** ทำให้ "list products" ทำงานได้ครบวงจร (server route → fetch → render) ก่อนเริ่ม "add a product" อย่า build ทั้ง 5 server routes ก่อนแล้วค่อยไปทำ React ทั้ง 4 features ทีหลัง — ให้สลับทำทั้งสองฝั่งไปพร้อมกัน
- **เปิด Network tab และ Console ใน browser บ่อย ๆ ตั้งแต่เนิ่น ๆ** bug ระหว่าง frontend-backend ส่วนใหญ่ (CORS errors, URL ผิด, port ผิด, fetch ที่ reject โดยไม่ได้ handle) จะโผล่ให้เห็นที่นี่ก่อน
- **ทำ `my-understanding.md` ไปพร้อม ๆ กับที่ build ไม่ใช่ทำทีเดียวตอนจบ** การตอบคำถาม "ฟอร์ม Add Product ของคุณคุยกับ server ยังไง" ทันทีหลัง build เสร็จนั้นง่ายกว่าการพยายามนึกย้อนทีหลังมาก
- **คะแนนของคุณสะท้อนความเข้าใจ ไม่ใช่ความอาวุโส** งาน core ที่ clean และอธิบายได้ดี จะได้คะแนนดีกว่างาน stretch goal ที่รีบทำแต่อธิบายไม่ได้
