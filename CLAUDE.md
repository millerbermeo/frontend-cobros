# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # dev server on port 5174 (auto-opens browser)
pnpm build        # tsc -b && vite build
pnpm lint         # eslint
pnpm preview      # preview production build
pnpm exec tsc -b  # type-check only (no emit)
```

No test suite configured. Type-check before every change: `pnpm exec tsc -b`.

## Architecture

**Stack:** React 19 + TypeScript 6 + Vite 8 + Tailwind v4 + HeroUI v3 + Zustand + TanStack Query + React Router v7 + Zod + React Hook Form. Node ≥ 22.13.0.

**Path alias:** `@/` → `src/`

### Folder structure

```
src/
  app/
    guards/       # AuthGuard (currently passthrough — TODO when backend ready)
    layouts/      # MainLayout, Sidebar, Navbar
    pages/        # NotFoundPage
    providers/    # AppProviders (QueryClient + GlobalModal + axios interceptor)
    store/        # app.store (theme), modal.store (global modal)
    themes/       # theme.config.ts — HeroUI color tokens
  features/       # one folder per domain module
    auth/
    dashboard/
    clientes/
    solicitudes/
    aprobaciones/
    contratos/
    cobranza/
    abonos/
    retiros/
    reportes/
    usuarios/
    configuracion/
  lib/
    axios.ts      # configured Axios instance, VITE_API_URL base URL, Bearer token helper
    pdf.ts        # re-exports react-pdf + pdf-lib with worker configured
    react-query.ts
    zustand.ts    # re-exports create, devtools, persist, StateCreator
  routes/
    index.tsx     # single createBrowserRouter, all routes here
  shared/
    components/
      forms/      # FormInput, FormSelect, FormTextarea, FormCheckbox, FormRadioGroup, FormFileUpload
      tables/     # DataTable (search, sort, pagination built-in)
      loaders/    # Spinner
      GlobalModal.tsx
    helpers/      # storage.helper (localStorage wrapper)
    hooks/        # useTheme, useDebounce, usePagination
    types/        # api.types (ApiResponse, ApiError, PaginatedResponse)
    utils/        # cn (clsx + twMerge), alert (SweetAlert2 wrapper)
```

### Feature module convention

Each feature has the same internal structure:

```
features/<name>/
  types/      # TypeScript interfaces
  schemas/    # Zod schemas + inferred types
  services/   # API calls via `import api from '@/lib/axios'`
  hooks/      # useQuery / useMutation wrappers (TanStack Query)
  components/ # UI components (forms, cards, etc.)
  layouts/    # optional layout wrapper
  pages/      # page-level components
  index.ts    # re-exports page(s)
```

### Routing

All app routes live in `src/routes/index.tsx`. Structure:
- `AppProviders` (root, wraps everything)
  - `/auth/*` → `AuthLayout` (unauthenticated)
  - `/` → `AuthGuard` → `MainLayout` (authenticated)
    - Feature pages are flat children

To add a route: import the page, add `{ path: 'x', element: <XPage /> }` in MainLayout children, add nav item in `Sidebar.tsx` NAV_ITEMS array, add entry in `Navbar.tsx` ROUTE_META.

### Global state

- **Theme** — `useAppStore` (Zustand + persist). Writes `dark` class to `<html>`.
- **Auth** — `useAuthStore` (Zustand + persist). Stores user + JWT token, sets Axios Authorization header on rehydration.
- **Global Modal** — `useModalStore` (Zustand). Call `useModal()` → `{ open, close }`.

### Global Modal usage

```tsx
const { open, close } = useModal()

// Simple confirmation (uses actions[])
open({
  title: 'Eliminar',
  size: 'xs',   // xs | sm | md | lg | full | cover
  content: <p>¿Confirmar?</p>,
  actions: [
    { label: 'Cancelar', onPress: close, variant: 'ghost' },
    { label: 'Eliminar', onPress: handleDelete, variant: 'danger' },
  ],
})

// Form modal (form owns its submit/cancel buttons, no actions[])
open({
  title: 'Nuevo registro',
  size: 'sm',
  content: <MyForm onSuccess={handleSave} onCancel={close} />,
})
```

GlobalModal renders via `createPortal` into `document.body` — no HeroUI Modal dependency.

### Alert / toast utility

SweetAlert2 wrapper at `@/shared/utils/alert`. Use instead of `window.alert` or raw Swal calls.

```tsx
import { alert } from '@/shared/utils/alert'

alert.toast('Guardado correctamente')           // success toast, 3 s
alert.toast('No se pudo conectar', 'error')
alert.success('Título', 'Texto opcional')
alert.error('Error', 'Descripción')
alert.confirm('¿Eliminar?', {
  text: 'No se puede deshacer',
  onConfirm: () => deleteItem(id),
})
```

### Shared form components

All form components in `@/shared/components/forms/` wrap HeroUI v3 compound fields with `react-hook-form`'s `Controller`. They accept `control` + `name` (not `register`).

```tsx
import { FormInput } from '@/shared/components/forms'

<FormInput<MyFormValues>
  name="correo"
  control={control}
  label="Correo"
  placeholder="usuario@ejemplo.com"
  type="email"
  isRequired
/>
```

### API response types

Services return axios responses wrapping these shapes from `@/shared/types/api.types`:

```ts
interface ApiResponse<T>     { data: T; message?: string; success: boolean }
interface PaginatedResponse<T> { data: T[]; total: number; page: number; pageSize: number; totalPages: number }
interface ApiError           { message: string; errors?: Record<string, string[]>; statusCode: number }
```

### HeroUI v3 — critical API differences from v2

HeroUI v3 uses **compound components**. Wrong patterns will silently fail or error.

```tsx
// Tooltip
<Tooltip delay={300}>
  <Tooltip.Trigger>{element}</Tooltip.Trigger>
  <Tooltip.Content placement="right" showArrow>text</Tooltip.Content>
</Tooltip>

// Avatar
<Avatar size="sm" className="bg-primary">
  <Avatar.Fallback className="text-white text-xs font-semibold">JD</Avatar.Fallback>
</Avatar>

// TextField (used inside shared form components)
<TextField isInvalid={!!error} isRequired>
  <Label>Campo</Label>
  <Input placeholder="..." />
  <FieldError>{error?.message}</FieldError>
</TextField>

// Button variants (valid): "primary" | "outline" | "danger" | "danger-soft" | "ghost" | "secondary" | "tertiary"
// "light" does NOT exist — use "ghost"
```

### Styling

Tailwind v4 — theme tokens defined in `src/index.css` via `@theme`. Semantic color tokens:

| Token | Light | Dark |
|---|---|---|
| `--color-primary` | `#6366f1` | `#818cf8` |
| `--color-background` | `#ffffff` | `#0f172a` |
| `--color-card` | `#ffffff` | `#1e293b` |
| `--color-border` | `#e5e7eb` | `#334155` |
| `--color-foreground` | `#111827` | `#f1f5f9` |
| `--color-muted` | `#9ca3af` | `#64748b` |

Use `cn()` from `@/shared/utils/cn` for conditional class merging.

### API layer

`VITE_API_URL` env var sets the base URL. All requests go through `src/lib/axios.ts`. The `AppProviders` sets up a 401 interceptor that auto-logouts. Each feature's `services/` file uses `import api from '@/lib/axios'` directly.

### PDF utilities

`@/lib/pdf` re-exports both `react-pdf` (viewer: `Document`, `Page`, `pdfjs`) and `pdf-lib` (`PDFDocument`, `StandardFonts`, `rgb`) with the worker already configured. Import from there, not directly from the packages.

### Auth status

`AuthGuard` is currently a passthrough (`<Outlet />`). Real auth guard pending backend readiness.

### Static / mock data

Several modules (dashboard, clientes, usuarios) use in-memory mock data while backend endpoints aren't ready. Service files exist and are ready to wire up. Mock data lives in `features/<name>/data/<name>.mock.ts`.
