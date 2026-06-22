**Browsify**

A simple full-stack product listing app with a Node.js + Express backend and a React frontend. The backend exposes a cursor-based paginated API for products and the frontend is a clean React UI that consumes it.

**Project Structure**
- **Backend**: [backend](backend/) — API server and DB models
- **React Frontend**: [frontend-react](frontend-react/) — full React app (recommended)
  
**Quick Start**
1. Start MongoDB (local or Atlas).
2. Run backend server:
```bash
cd backend
npm install
# create a .env with MONGODB_URI and optional PORT
# example .env:
# MONGODB_URI=mongodb://localhost:27017/shopify-task
# PORT=5000
node seed.js    # optional: populate sample products
npm run dev
```

3. Run React frontend (in a separate terminal):
```bash
cd frontend-react
npm install
npm start
```

4. Open the app: React dev server runs at `http://localhost:3000` and the backend API runs at `http://localhost:5000` by default.

**Backend Overview**
- Server entry: [backend/server.js](backend/server.js)
- Routes: [backend/routes/productRoutes.js](backend/routes/productRoutes.js)
- Model: [backend/models/product.js](backend/models/product.js)
- Seed data helper: [backend/seed.js](backend/seed.js)

The backend uses cursor-based pagination sorted by `createdAt` (descending) and `_id` as a tiebreaker. CORS is enabled so the React app can call the API from `localhost:3000`.

Environment variables (.env)
- `MONGODB_URI` (required) — MongoDB connection string
- `PORT` (optional) — API port (default 5000)

**API Reference**

GET /api/products
- Query parameters:
  - `category` (optional) — filter by product category (exact match)
  - `cursor` (optional) — ISO date string representing last seen `createdAt` for pagination
  - `cursorId` (optional) — `_id` of the last seen document used as a tie-breaker

Response example:
```json
{
  "products": [
    {"_id":"...","name":"TV","category":"Electronics","price":499.99,"createdAt":"2026-01-01T12:00:00.000Z"}
  ],
  "nextCursor": {"createdAt":"2025-12-31T11:00:00.000Z","id":"..."} // or null
}
```

Notes on pagination:
- The API returns up to 20 items per request. If `nextCursor` is present, it can be passed to the next request as `cursor` and `cursorId` to fetch the next page.

**Frontend (React)**
- Entry: [frontend-react/src/App.js](frontend-react/src/App.js)
- The React app uses hooks to fetch products, apply category filters, and navigate pages using the API's cursors. If you need to change the API URL, update `API_BASE_URL` in `src/App.js`.

Static demo
- A small non-React demo is available at [frontend/index.html](frontend/index.html) (useful for quick testing without running `npm start`).

**Common Commands**
- Backend (development): `cd backend && npm run dev`
- Seed DB: `cd backend && node seed.js`
- React frontend: `cd frontend-react && npm start`
- Build React frontend: `cd frontend-react && npm run build`

**Troubleshooting**
- "Cannot connect to backend": ensure backend is running and `MONGODB_URI` is correct.
- `ENOENT package.json` when running `npm` from project root: run commands from the relevant subfolder (`backend` or `frontend-react`).
- CORS issues: CORS is enabled in [backend/server.js](backend/server.js). Make sure the frontend requests are pointing to the correct host and port.

**Development Tips**
- Run backend and frontend in separate terminals so both live-reload independently.
- Use the `seed.js` helper to populate realistic sample data for development and testing.
