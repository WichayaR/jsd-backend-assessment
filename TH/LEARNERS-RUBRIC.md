# สิ่งที่คุณจะถูกประเมิน (What You Are Being Assessed On)

คะแนนของคุณสะท้อนความเข้าใจในสิ่งที่คุณสร้าง — ไม่ใช่แค่ว่ามันทำงานได้หรือไม่ แต่ละหัวข้อด้านล่างจะถูกประเมินจากทั้งโค้ดของคุณ (`client/` และ `server/`) และคำตอบที่เขียนไว้ใน `my-understanding.md`

ไม่มีการ pass หรือ fail คะแนนของคุณจะบอกว่าความเข้าใจส่วนไหนแข็งแรง และส่วนไหนควรโฟกัสเพิ่มเติม

---

## Areas of Assessment

### Backend

#### 1. Express Server Setup
- server ของคุณ start ได้ถูกต้องและ listen บน port
- ใช้ `node --watch`
- ใช้ `express.json()` และอธิบายได้ว่าทำไมถึงจำเป็น
- config CORS ไว้แล้ว และอธิบายได้ว่ามันคืออะไรและทำไมแอป React ของคุณถึงต้องใช้มันในการเข้าถึง API

#### 2. Routing
- implement ครบทั้ง 5 routes: GET all, GET one, POST, PUT/PATCH, DELETE
- อธิบายได้ว่าแต่ละ HTTP method หมายถึงอะไร และทำไมเราถึงใช้ method ต่างกัน

#### 3. Request Handling
- routes ของคุณใช้ `req.body`, `req.params`, และ `req.query` ได้ถูกต้อง
- อธิบายความแตกต่างของทั้งสามอย่างนี้ได้ พร้อมยกตัวอย่างจากโค้ดของคุณเอง

#### 4. Response Quality
- API คืนค่าเป็น JSON พร้อม HTTP status codes ที่เหมาะสม (200, 201, 400, 404)
- อธิบายได้ว่าทำไม status codes ถึงสำคัญ และทำไมถึงเลือกใช้แต่ละตัว

#### 5. CRUD Operations
- in-memory array ของคุณรองรับ Create, Read, Update, และ Delete ได้อย่างถูกต้อง
- อธิบายได้ทีละขั้นตอนว่าเกิดอะไรขึ้นบน server ตั้งแต่ request มาถึงจนกระทั่ง response ถูกส่งกลับ

#### 6. Error Handling & Middleware
- มี custom middleware อย่างน้อย 1 ตัว (เช่น request logger)
- มี error-handling middleware พร้อม response ที่มีความหมาย
- อธิบายได้ว่า middleware คืออะไร ทำไม order ถึงสำคัญ และ error handling ของคุณทำอะไรบ้าง

### Frontend & Integration

#### 7. Fetching & Displaying Data
- แอป React ของคุณ fetch product list จาก API ตอน load และ render ออกมา
- อธิบายได้ว่า `useEffect` ในโค้ด data-fetching ของคุณทำอะไร และทำไมถึงเรียก fetch ตรง ๆ ใน component body ไม่ได้

#### 8. State Management
- component state (`useState`) ของคุณสะท้อนสิ่งที่อยู่บน server ได้ถูกต้องหลังจากทุก create, update, และ delete
- อธิบายความแตกต่างระหว่าง "server state" (สิ่งที่อยู่ใน Express array) กับ "UI state" (สิ่งที่ React กำลังแสดงอยู่) และวิธีที่คุณทำให้ทั้งสองอย่าง sync กัน

#### 9. Sending Data to the API
- ฟอร์ม Add และ Edit ของคุณส่งข้อมูลไปยัง route และ method ที่ถูกต้อง
- อธิบายได้ทีละขั้นตอนว่าเกิดอะไรขึ้นตั้งแต่ผู้ใช้คลิก "Submit" จนหน้าจออัปเดต

#### 10. Handling Loading & Errors on the Client
- แสดง loading state ระหว่าง fetch ครั้งแรก
- request ที่ล้มเหลว (เช่น server ไม่ได้รันอยู่ หรือ response 400/404) ถูก catch และแสดงให้ผู้ใช้เห็น แทนที่จะ crash หรือล้มเหลวแบบเงียบ ๆ
- อธิบายได้ว่าจะเกิดอะไรขึ้นกับแอปของคุณถ้า server ถูกปิด

#### 11. Frontend-Backend Communication
- อธิบายได้ว่า CORS คืออะไร แก้ปัญหาอะไร และถ้าไม่ config ไว้จะเห็น error แบบไหนใน browser
- อธิบายได้ว่า API base URL ของคุณถูกกำหนดไว้ที่ไหน และทำไมถึงไม่ hardcode ไว้ในทุก fetch call
- อธิบายได้ด้วยคำพูดของตัวเองว่า action หนึ่งใน app ของคุณ (เช่น การลบ product) เดินทางไปมาอย่างไรตั้งแต่การคลิกใน browser ไปจนถึง array บน server ที่เปลี่ยนแปลง แล้วย้อนกลับมา

### AI Tool Usage

#### 12. AI Code Contribution
- คุณ rate ตัวเองอย่างตรงไปตรงมาบน **AI Code Contribution Scale** และ rating นั้นสอดคล้องกับสิ่งที่โค้ดและคำตอบอื่น ๆ ของคุณแสดงให้เห็นจริง
- ถ้า rate ไว้ 2 ขึ้นไป: คุณแสดงให้เห็นได้ว่าแบ่งงานออกเป็น prompt เล็ก ๆ ที่มีทิศทางชัดเจน แทนที่จะขอ AI "สร้างทั้งแอปให้หน่อย" ในครั้งเดียว
- ถ้า rate ไว้ 2 ขึ้นไป: คุณชี้ได้ว่ามีอะไรอย่างน้อย 1 อย่างที่คุณเปลี่ยน แก้ไข หรือปฏิเสธจาก output ที่ AI สร้างให้ พร้อมเหตุผล
- ถ้า rate ไว้ 2 ขึ้นไป: คุณอธิบาย bug หรือ error จริง ๆ ที่เจอได้ 1 อย่าง และวิธีที่คุณ diagnose มันจริง ๆ — ไม่ใช่แค่ "copy error ไปถามใน chat"

---

## Score Bands

| Score | ความหมาย |
|---|---|
| 85–100 | Strong — เข้าใจแน่น ครบทั้งฝั่ง backend และ frontend integration |
| 70–84 | Good — เข้าใจพื้นฐานดี มี gap เล็กน้อยที่ควรทบทวน |
| 50–69 | Foundational — เข้าใจ concept หลักแล้ว แนะนำให้ทบทวนเพิ่มเติมแบบเจาะจง |
| 35–49 | Gaps identified — มีหลายจุดที่ต้องเสริมความเข้าใจ จะมีการนัด follow-up session |
| Below 35 | Urgent — มี gap สำคัญในหลายหัวข้อ จะมีการช่วยเหลือทันที |

---

## Bonus

การทำ stretch goals (MongoDB Atlas, input validation ที่แสดงผลใน UI, การแยก Router, client-side search/sort, detail page, optimistic updates) จะได้คะแนนโบนัสเพิ่มจากคะแนน core คะแนนโบนัสจะไม่ทำให้คะแนนของคุณลดลง

---

## หมายเหตุเกี่ยวกับวิธีการประเมิน (A Note on Assessment Method)

Assessment นี้ไม่มีวิดีโอ walkthrough ความเข้าใจของคุณจะถูกประเมินทั้งหมดผ่านโค้ดและคำตอบที่เขียนไว้ใน `my-understanding.md` ตอบให้ครบถ้วนและใช้คำพูดของตัวเอง — คำตอบที่คลุมเครือหรือ copy มาจะสังเกตเห็นได้ง่าย และจะถูกนับว่าเป็น gap ทางความเข้าใจ ไม่ใช่คำตอบที่ใช้ได้

---

## หมายเหตุเกี่ยวกับการใช้ AI และการให้คะแนน (A Note on AI Usage & Scoring)

rating บน AI Code Contribution Scale ของคุณ **ไม่ถูกให้คะแนนด้วยตัวมันเอง** — 0 ไม่ได้คะแนนดีกว่า 5 และไม่มีประโยชน์ที่จะพูดน้อยหรือมากกว่าความจริงว่าใช้ AI แค่ไหน สิ่งที่ถูกประเมินจริง ๆ คือ:

1. rating ของคุณ **ตรงไปตรงมาและสอดคล้องกัน** หรือไม่ — ถ้าคุณ rate ตัวเอง 0 หรือ 1 แต่อธิบาย concept พื้นฐานไม่ได้ หรือ rate ตัวเอง 5 แต่คำตอบที่เขียนไว้แสดงความเข้าใจที่ลึกและแม่นยำมาก สิ่งที่จะถูก flag คือความไม่สอดคล้องนี้ ไม่ใช่ตัวเลขที่เลือก
2. ไม่ว่า rating จะเป็น 2 ขึ้นไปหรือไม่ คุณแสดง **process ที่มีทิศทางและมีการ verify** ได้หรือเปล่า — แบ่งงานเป็นขั้นตอน ทดสอบสิ่งที่ AI สร้างให้ จับและแก้ไขอย่างน้อย 1 อย่าง และอธิบาย bug จริงที่เคยเจอได้

learner ที่ rate ตัวเอง 5 อย่างตรงไปตรงมา และแสดง process ที่ควบคุมได้ดี จะได้คะแนนดีพอ ๆ กับ learner ที่เขียนเองทั้งหมดและ rate ตัวเอง 0 ส่วน learner ที่บอกว่า 0 แต่โค้ดกับคำตอบบ่งชี้เป็นอย่างอื่น จะได้คะแนนแย่กว่าถ้าเขาแค่พูดความจริงตั้งแต่แรก
