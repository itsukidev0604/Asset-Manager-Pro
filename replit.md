# TRI ANH EDU

Nền tảng luyện thi HSA (ĐHQGHN) và TSA (Bách Khoa) hàng đầu Việt Nam — học lý thuyết, luyện đề, thi thử và theo dõi tiến độ trên một nền tảng duy nhất.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, proxied at `/api`)
- `pnpm --filter @workspace/tri-anh-edu run dev` — run the frontend (port 23633, proxied at `/`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Wouter routing, TanStack Query, Framer Motion, Tailwind v4, shadcn/ui, Recharts, Embla Carousel
- API: Express 5 + pino logging
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth for API shape)
- `lib/db/src/schema/` — Drizzle table definitions (teachers, courses, exams, blog, testimonials)
- `lib/api-client-react/src/generated/` — generated TanStack Query hooks
- `lib/api-zod/src/generated/` — generated Zod validation schemas
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/api-server/src/lib/seed.ts` — database seed data (Vietnamese content)
- `artifacts/tri-anh-edu/src/pages/` — all 16 page components
- `artifacts/tri-anh-edu/src/components/` — Navbar, Footer, shadcn/ui components

## Architecture decisions

- Contract-first API: OpenAPI spec defines all endpoints; Orval generates both hooks (client) and Zod schemas (server validation)
- DB seeded on first startup via `seedIfEmpty()` called in `app.ts` — idempotent, checks for existing teachers row
- Wouter for routing (lighter than React Router); `base` set from `import.meta.env.BASE_URL`
- All brand colors defined as CSS custom properties in `index.css` and exposed as Tailwind tokens
- Exam-take page (`/exams/:id/take`) renders without the Layout wrapper (no Navbar/Footer)

## Product

- **Home** — 13-section landing page: hero, stats, features, HSA/TSA programs, courses, exam platform demo, exam library, teachers, testimonials, blog, CTA
- **Courses** — searchable/filterable course catalog with HSA/TSA filter
- **Course Detail** — full course page with curriculum accordion, teacher info, enrollment CTA
- **Exams** — searchable exam library with type/difficulty filters
- **Exam Detail** — exam overview with sample questions
- **Exam Take** — full-screen exam interface with timer, question navigation, answer selection
- **Exam Result** — score breakdown with section analysis and recharts
- **Teachers** — teacher profiles with ratings/experience
- **Teacher Detail** — bio, linked courses
- **Blog** — filterable article list
- **Blog Detail** — full article with CTA card
- **Auth** — Login, Register (split layout), Forgot Password
- **Dashboard** — progress charts (Recharts LineChart), recent exams, enrolled courses
- **Profile** — tabbed profile editor with achievements

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Never run `pnpm dev` at workspace root — use `restart_workflow` or individual artifact commands
- `embla-carousel-autoplay` is a separate package from `embla-carousel-react` (both installed)
- After schema changes, run `pnpm --filter @workspace/db run push` then `pnpm --filter @workspace/api-spec run codegen`
- Vite typecheck: use `--filter @workspace/tri-anh-edu run typecheck`, not `build`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
