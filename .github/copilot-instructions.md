# Copilot instructions

## Architecture and flow

- Entry point is `src/index.ts`: loads env, configures Express, connects DB, mounts router, then error handlers.
- Routes are composed in `src/router/router.ts` and grouped by feature under `src/modules/*`.
- Each module follows a pattern: `*.router.ts` wires validators and controllers, `*.controller.ts` contains request logic, `*.validator.ts` defines `express-validator` rules.
- MongoDB is initialized in `src/config/db.ts`. Missing `MONGO_URI` should not crash the server (health-check mode).
- Auth is JWT-based. `src/middleware/checkLogin.ts` sets `req.user` for protected routes.
- Error handling is centralized in `src/middleware/errorHandler.ts` via `validationHandler` and `withErrorHandling`.

## Conventions and patterns

- Use `withErrorHandling` for async controllers to funnel errors to the global handler.
- Place input validation in `*.validator.ts` and attach via `validationHandler` in routers.
- Keep controllers thin and return JSON responses; remove sensitive fields like `password` before responding (see user controller).
- Base API paths are prefixed with `/api` in the router layer.

## Developer workflows

- Dev server: `npm run dev` (ts-node-dev with path mapping).
- Build: `npm run build`, Run: `npm start`.
- Port 5000 can be occupied by macOS AirPlay; prefer `PORT=5050` during local dev.

## Integration points

- JWT secret comes from `JWT_SECRET`.
- MongoDB connection uses `MONGO_URI` (or `MONGO_URL`/`MONGO`).
- Planned FCM integration for notifications; current codebase does not include Firebase SDK yet.
