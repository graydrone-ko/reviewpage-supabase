# Repository Guidelines

## Project Structure & Module Organization
- `frontend/`: React SPA with routes under `src/pages`, shared UI in `src/components`, hooks/utilities beside their usage, and type defs in `src/types`.
- `backend/backend/`: Express API. Routes live in `src/routes`, controller logic in `src/controllers`, utilities in `src/utils`, and compiled JS emitted to `dist/`.
- `backend/prisma/` and `supabase/`: local Prisma schema prototypes and production Supabase migrations, respectively.
- `scripts/`: operational helpers (e.g., `create-test-users.js`).
- `tests/playwright/`: end-to-end smoke specs.

## Build, Test, and Development Commands
- `npm run dev` (repo root): concurrently boots the API on http://localhost:3001 through `ts-node`.
- `cd frontend && npm start`: serves the SPA on http://localhost:3000 with hot reload.
- `npm run build`: runs `build:frontend` and `build:backend` to produce deployable artifacts.
- `cd frontend && npm test --watch`: Jest + Testing Library suite; drop `--watch` for CI.
- `npx playwright test tests/playwright --headed`: interactive end-to-end verification.

## Coding Style & Naming Conventions
- Language: TypeScript everywhere; keep indentation at 2 spaces.
- React: prefer functional components, hooks for state, Tailwind utility classes for styling, and Axios calls inside `frontend/src/services`.
- Express: export typed controller functions; avoid `any`. Run `cd backend/backend && npm run type-check` before pushing.
- Follow existing naming: `camelCase` for variables/functions, `PascalCase` for React components and controllers.

## Testing Guidelines
- Co-locate component/hook tests next to implementations as `*.test.tsx`.
- Use supplied Axios interceptors to mock HTTP calls.
- Seed deterministic fixtures with `scripts/create-test-users.js` prior to integration or Playwright runs.
- Treat new endpoints as requiring at least one happy-path test; extend Playwright specs when UI changes are customer-facing.

## Commit & Pull Request Guidelines
- Use conventional commits (e.g., `fix(surveys): align response counts`, `feat(responses): add admin preview`).
- Before opening PRs, confirm `npm test`, `npm run type-check`, and relevant Playwright suites pass locally.
- PR description checklist: link tracked issues, summarize behavior changes, note env or migration updates, attach screenshots for UI tweaks.

## Security & Configuration Tips
- Copy `.env.example` or `.env.production.template`, then populate Supabase URLs, JWT secrets, and CORS origins before running services.
- Never commit secrets; record rotation procedures or value changes in `backend/DEPLOYMENT_INSTRUCTIONS.md` for deployers.
