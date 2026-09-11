# Fullstack Integration Assessment Brief

## The Task

Build a REST API for a shopping cart using **Express.js**, and a **React** app that talks to it.

Your API will manage a list of `products`. Your React app will let a user view, add, edit, and delete those products through the browser — by calling your API, not by faking the data locally.

By the end of the assessment you should have a working Express server and a working React app running side by side on your machine, and you should be able to explain how and why data moves between them.

This assessment runs **entirely locally**. There is no deployment step — you do not need to host your API or your React app anywhere. Everything is demonstrated by running both apps on `localhost`.

---

## A Note on AI Tools

You are free to use AI tools (ChatGPT, Claude, Copilot, etc.). This is not a memory test.

What the assessment measures is your **understanding**. You need to be able to explain your code and reason about it in `my-understanding.md`. If you use AI to generate something you do not understand, it will show in your written answers.

The best approach: use AI as a learning tool, not a shortcut. Ask it to explain things, not just produce them.

**You will also rate your own AI use.** At the top of `my-understanding.md` you'll find the **AI Code Contribution Scale** (0–5, from "no AI use" to "AI generated the code with limited understanding"). Pick the number that honestly describes how you worked — the number itself is not scored, so there's no benefit to under- or over-stating it. What is assessed is whether your rating is honest and consistent with your code and answers, and whether whatever AI use you did have was directed and verified rather than just accepted. If you select 2 or higher on the scale, you'll also answer a short set of process questions about how you used AI — see `my-understanding.md`.

---

## What You Are Building

### 1. An Express API (`server/`)

| Method | Route | Description |
|---|---|---|
| GET | `/products` | Return all products |
| GET | `/products/:id` | Return a single product by ID |
| POST | `/products` | Add a new product |
| PUT or PATCH | `/products/:id` | Update an existing product |
| DELETE | `/products/:id` | Remove a product |

#### The Product

Each product should have at minimum:

| Field | Type | Notes |
|---|---|---|
| `id` | string | Generated when a product is created (e.g. `String(Date.now())`) |
| `name` | string | Required |
| `price` | number | Required |
| `quantity` | number | Required, defaults to `1` |

### 2. A React app (`client/`)

A React app, built from scratch, that talks to your API over `fetch` (or `axios`) — not a static/hardcoded list. When your server data changes, refreshing the React app should show the new data.

At minimum, the app should let a user:

- See the full list of products (fetched from `GET /products` when the app loads)
- Add a new product using a form (calls `POST /products`)
- Edit an existing product (calls `PUT`/`PATCH /products/:id`)
- Delete a product (calls `DELETE /products/:id`)

The list on screen should update after each of these actions **without a manual page refresh** — i.e. your component state is kept in sync with what the API just did.

---

## Requirements

### Core Backend (everyone)

- [ ] Express server created and listening on a port
- [ ] `node --watch` used to run the server (no need for nodemon)
- [ ] `express.json()` middleware applied
- [ ] CORS enabled so a React app running on a different port can call the API (e.g. the `cors` package)
- [ ] All five routes implemented (GET all, GET one, POST, PUT/PATCH, DELETE)
- [ ] Route parameters used to identify a product (`/products/:id`)
- [ ] At least one query string supported (e.g. filter by name or sort by price)
- [ ] Products stored in an in-memory array (no database required)
- [ ] Correct HTTP status codes returned (200, 201, 400, 404)
- [ ] At least one custom middleware written (e.g. a request logger)
- [ ] Error handling middleware included at the end of the middleware chain
- [ ] Meaningful error messages returned when something goes wrong

### Core Frontend (everyone)

- [ ] React app created from scratch (Vite recommended: `npm create vite@latest client -- --template react`)
- [ ] Product list fetched from `GET /products` and rendered on load (e.g. using `useEffect` + `useState`)
- [ ] A loading state shown while the initial fetch is in progress
- [ ] An error state shown if the fetch fails (e.g. server not running) — the app should not just break silently
- [ ] A form to add a new product that calls `POST /products` and updates the on-screen list when it succeeds
- [ ] A way to edit an existing product that calls `PUT`/`PATCH /products/:id` and updates the on-screen list
- [ ] A way to delete a product that calls `DELETE /products/:id` and removes it from the on-screen list
- [ ] The API base URL is stored in one place (e.g. a `.env` file with `VITE_API_URL`), not hardcoded in every fetch call
- [ ] No page reloads are used to "refresh" data after an action — state is updated in React

### Stretch (if you finish early)

- [ ] Connect the API to a **MongoDB Atlas** database and persist products there
- [ ] Validate incoming request data on the server — reject missing or invalid fields with a 400 response, and surface that error message in the React UI
- [ ] Move your Express routes into a separate file using `express.Router()`
- [ ] Add client-side search/sort controls in React that are sent to the API as query strings (ties into the query-string requirement above)
- [ ] Add a product detail page using React Router (e.g. `/products/:id`)
- [ ] Add basic optimistic UI updates (update the screen before the API response comes back, then reconcile)

---

## Folder Structure

This is a **single GitHub repository** containing both apps side by side. You do not need npm/pnpm/yarn workspaces — just two independent folders, each with their own `package.json`, run in two separate terminals.

### Core

```
your-project/
├── client/
│   ├── src/
│   │   └── ... (your React components)
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

**Running your server**
```bash
cd server
node --watch index.js
```

**Running your React app** (in a second terminal)
```bash
cd client
npm run dev
```

Both need to be running at the same time for the app to work — the server on one port (e.g. `3000`), the React dev server on another (e.g. `5173`). This is exactly why CORS needs to be configured on the server: the browser treats these as two different origins.

**Testing your API routes directly**

Use the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VS Code extension to test your routes independently of the frontend, especially while building. Create a file called `requests.http` in `server/` and write your requests there. Postman is also fine if you prefer it.

Example `requests.http`:
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

Testing your routes this way first — before wiring them into React — makes it much easier to tell whether a bug is on the server side or the client side.

---

## Submission

Here is what to prepare and where each piece goes:

### 1. GitHub Repository — link goes in the Google Sheet
Push your project (both `client/` and `server/`) to a single **public** GitHub repository. Paste the link into the shared Google Sheet your instructor has provided.

> The repo must be set to **public** — a private repo cannot be reviewed.

> Make sure `node_modules/` is excluded via `.gitignore` in both `client/` and `server/`.

### 2. README.md — lives at the root of your GitHub repo
A short README explaining how to run your project locally: how to install dependencies and start both the server and the client, and what ports they run on.

### 3. my-understanding.md — lives at the root of your GitHub repo
Use `MY_UNDERSTANDING_TEMPLATE.md` as your starting point — copy it into your project, rename it `my-understanding.md`, and answer all questions in your own words. This includes rating yourself on the **AI Code Contribution Scale** at the top, and — if you rated 2 or higher — the AI process questions at the end.

Write as if explaining to a friend. Do not copy from documentation or AI output. This is where your understanding is actually assessed, so take it seriously — there is no video to fall back on.

---

## Tips

- **Get the server working and tested with REST Client before touching React.** Debugging a fetch call against a server you haven't verified yourself is much harder than debugging a server directly.
- **Build one full slice at a time.** Get "list products" fully working end to end (server route → fetch → render) before starting "add a product". Don't build all five server routes and then all four React features — alternate between them.
- **Open your browser's Network tab and Console early and often.** Most frontend-backend bugs (CORS errors, wrong URL, wrong port, unhandled rejected fetch) show up there first.
- **Complete `my-understanding.md` as you go, not all at once at the end.** Answering "how does your Add Product form talk to your server?" right after you build it is much easier than trying to reconstruct it later.
- **Your score reflects your understanding, not your seniority.** A clean, well-explained core submission scores better than a rushed stretch goal you cannot explain.
