# AGENTS.md

## Cursor Cloud specific instructions

This is **X Follow Clean**, a Next.js 14 application that analyzes X (Twitter) following lists using AI to identify information chain positions and recommend unfollows.

### Tech Stack
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** TailwindCSS + Framer Motion
- **AI:** Claude API via OpenAI-compatible client (endpoint in `.env.local`)
- **Package manager:** npm (`package-lock.json`)

### Running the App
- `npm run dev` — starts dev server on port 3000
- `npm run build` — production build
- `npm run lint` — ESLint checks

### Key Architecture Notes
- Mock Twitter data is in `src/lib/mock-data.ts` (20 accounts across 6 categories)
- Claude API integration in `src/lib/claude.ts` with fallback analysis if API fails
- The info chain axis tooltips use `createPortal` to render to `document.body` — this was necessary to prevent layout shifts when tooltips appear
- API key and base URL are configured in `.env.local` (not committed)

### Environment Variables Required
- `CLAUDE_API_KEY` — Claude-compatible API key
- `CLAUDE_BASE_URL` — API endpoint (e.g., `https://api.aigocode.com`)
