# LocalIQ — AI-Powered Local Business Intelligence

Hackathon-ready React + Vite + Tailwind CSS frontend for a local-business product intelligence platform.

## What is included

- Responsive SaaS dashboard
- Collapsible desktop sidebar + mobile drawer
- Product catalog and filters
- Product upload/analyze demo flow
- Market and competitor intelligence
- Review sentiment intelligence
- Weather + local demand intelligence
- Evidence-backed AI recommendation page
- English/Tamil AI marketing studio
- Campaign planner
- Smart notifications
- Marketing analytics
- Settings
- Loading, toast and empty states
- Mock API architecture ready for FastAPI integration

## Main demo journey

Dashboard → Add Product → Upload Product → Analyze Product → Product Intelligence → Competitor Analysis → Weather + Local Demand → AI Recommendation → Marketing Studio → Campaign Planner → Analytics

## Setup

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## Production build

```bash
npm run build
npm run preview
```

## Future FastAPI integration

Set:

```env
VITE_API_URL=http://localhost:8000/api
```

Then replace the Promise-based mock functions in `src/services/api.js` with Axios requests such as:

```js
apiClient.get("/products");
apiClient.get(`/products/${id}/intelligence`);
apiClient.get(`/products/${id}/demand`);
apiClient.get(`/products/${id}/recommendation`);
apiClient.post("/marketing/generate", data);
```

No backend is included in this project.
