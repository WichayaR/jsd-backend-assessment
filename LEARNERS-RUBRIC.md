# What You Are Being Assessed On

Your score reflects your understanding of what you built — not just whether it works. Each area below is assessed across your code (`client/` and `server/`) and your written answers in `my-understanding.md`.

There is no pass or fail. Your score tells you where your understanding is strong and where to focus next.

---

## Areas of Assessment

### Backend

#### 1. Express Server Setup
- Your server starts correctly and listens on a port
- `node --watch` is used
- `express.json()` is applied and you can explain why it is needed
- CORS is configured and you can explain what it is and why it's needed for your React app to reach your API

#### 2. Routing
- All five routes are implemented: GET all, GET one, POST, PUT/PATCH, DELETE
- You can explain what each HTTP method means and why we use different methods

#### 3. Request Handling
- Your routes correctly use `req.body`, `req.params`, and `req.query`
- You can explain the difference between all three with examples from your own code

#### 4. Response Quality
- Your API returns JSON with appropriate HTTP status codes (200, 201, 400, 404)
- You can explain why status codes matter and why you chose each one

#### 5. CRUD Operations
- Your in-memory array correctly supports Create, Read, Update, and Delete
- You can walk through what happens on the server from the moment a request arrives to the moment a response is sent

#### 6. Error Handling & Middleware
- At least one custom middleware is present (e.g. a request logger)
- Error-handling middleware is in place with a meaningful response
- You can explain what middleware is, why order matters, and what your error handling does

### Frontend & Integration

#### 7. Fetching & Displaying Data
- Your React app fetches the product list from your API on load and renders it
- You can explain what `useEffect` is doing in your data-fetching code and why the fetch isn't just called directly in the component body

#### 8. State Management
- Your component state (`useState`) correctly reflects what's on the server after every create, update, and delete
- You can explain the difference between "server state" (what's in your Express array) and "UI state" (what React is currently showing), and how you keep them in sync

#### 9. Sending Data to the API
- Your Add and Edit forms correctly send data to the right route with the right method
- You can explain, step by step, what happens from a user clicking "Submit" to the screen updating

#### 10. Handling Loading & Errors on the Client
- A loading state is shown during the initial fetch
- A failed request (e.g. server not running, or a 400/404 response) is caught and shown to the user rather than crashing or failing silently
- You can explain what happens in your app if the server is turned off

#### 11. Frontend-Backend Communication
- You can explain what CORS is, what problem it solves, and what error you'd see in the browser without it
- You can explain where your API's base URL is defined and why it isn't hardcoded in every fetch call
- You can explain, in your own words, the full round trip of one action in your app (e.g. deleting a product) from the click in the browser to the array changing on the server and back

### AI Tool Usage

#### 12. AI Code Contribution
- You rated yourself honestly on the **AI Code Contribution Scale**, and that rating is consistent with what your code and your other written answers actually show
- If you rated 2 or higher: you can show how you broke the work into small, directed prompts rather than one large "build the whole thing" request
- If you rated 2 or higher: you can point to at least one specific thing you changed, corrected, or rejected from AI-generated output, and explain why
- If you rated 2 or higher: you can describe one real bug or error you hit and how it was actually diagnosed — not just "I pasted the error back into the chat"

---

## Score Bands

| Score | What it means |
|---|---|
| 85–100 | Strong — confident, well-rounded understanding across both backend and frontend integration |
| 70–84 | Good — solid grasp with minor gaps worth revisiting |
| 50–69 | Foundational — core concepts are there; targeted revision recommended |
| 35–49 | Gaps identified — several areas need reinforcement; a follow-up session will be arranged |
| Below 35 | Urgent — significant gaps across multiple areas; immediate support will be offered |

---

## Bonus

Completing any stretch goals (MongoDB Atlas, input validation surfaced in the UI, Router splitting, client-side search/sort, a detail page, optimistic updates) adds bonus marks on top of your core score. They cannot reduce your score.

---

## A Note on Assessment Method

There is no video walkthrough for this assessment. Your understanding is assessed entirely through your code and your written answers in `my-understanding.md`. Answer thoughtfully and in your own words — vague or copied answers are easy to spot and will be treated as a gap in understanding, not a working answer.

---

## A Note on AI Usage & Scoring

Your AI Code Contribution Scale rating is **not** scored on its own — a 0 does not score higher than a 5, and there is no benefit to under- or over-stating how much AI you used. What is assessed is:

1. Whether your rating is **honest and consistent** — if you rate yourself a 0 or 1 but cannot explain basic concepts, or rate yourself a 5 but your written answers show deep, precise understanding, that mismatch is what gets flagged, not the number itself.
2. Whether, for any rating of 2 or higher, you can demonstrate a **directed and verified process** — you broke the work into steps, tested what was generated, caught and fixed at least one thing, and can explain a bug you actually hit.

A learner who honestly rates themselves a 5 and clearly shows good process control can score just as well as a learner who wrote everything by hand and rates themselves a 0. A learner who claims a 0 but whose code and answers suggest otherwise will score worse than if they had simply been honest.
