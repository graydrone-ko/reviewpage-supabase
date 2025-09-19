# Repository Guidelines

## Project Structure & Module Organization
The React client lives in `frontend/` (routes in `src/pages`, shared UI in `src/components`, hooks/utilities alongside). The Express API is in `backend/backend/` with routes under `src/routes`, controller logic in `src/controllers`, and reusable helpers in `src/utils`; compiled JS lands in `dist/`. Database definitions are split between Prisma assets in `backend/prisma/` for local scaffolding and Supabase migrations in `supabase/` for production. Operational scripts sit in `scripts/`, and cross-surface Playwright specs reside in `tests/playwright/`.

## Build, Test, and Development Commands
- `npm run dev` (repo root) boots the API on http://localhost:3001 via `ts-node`.
- `cd frontend && npm start` serves the SPA on port 3000 with hot reload.
- `npm run build` runs both `build:frontend` and `build:backend` to generate deployable assets.
- `cd frontend && npm test --watch` executes Jest + Testing Library suites; drop `--watch` in CI.
- `npx playwright test tests/playwright --headed` reproduces the smoke E2E flow with a visible browser when debugging.

## Coding Style & Naming Conventions
- Stick to TypeScript, 2-space indentation, and `camelCase` for functions/variables; favor `PascalCase` for React components and Express controllers.
- Prefer functional React components with hooks for state, Tailwind utility classes for styling, and keep Axios calls in `frontend/src/services`.
- Backend modules should export typed functions, avoid implicit any, and run `cd backend/backend && npm run type-check` before pushing.

## Testing Guidelines
- Place component or hook tests beside the implementation under `frontend/src/**/*.test.tsx` and mock API calls with the existing Axios interceptors.
- Seed data using `scripts/create-test-users.js` before running integration or Playwright tests to keep fixtures deterministic.
- Treat new endpoints as needing at least a happy-path test; add `*.spec.ts` near the handler or extend the Playwright spec to cover the UI.

## Commit & Pull Request Guidelines
- Follow the conventional commit pattern already in history (`fix(surveys): …`, `feat(responses): …`) and keep each commit focused.
- Confirm `npm test`, `npm run type-check`, and the relevant Playwright suite pass locally before opening a PR.
- PR descriptions should link tracked issues, summarize behaviour changes, call out env or migration updates, and include screenshots for visible UI tweaks.

## Environment & Configuration Tips
- Copy `.env.example` or `.env.production.template` when provisioning new environments, then fill Supabase URLs, JWT secrets, and CORS origins before running services.
- Never commit secrets; document rotation steps or value changes in `backend/DEPLOYMENT_INSTRUCTIONS.md` so deployers stay aligned.

## 특정 명사를 제외하고 사용자 답변과 커뮤니케이션은 한글로 진행 