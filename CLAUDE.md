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

### Alert / loading utility — métodos adicionales

```tsx
alert.loading('Creando usuario...')   // spinner SweetAlert2, bloquea clicks
alert.closeLoading()                  // cierra el spinner antes del toast
```

Patrón obligatorio en todas las mutations:
```tsx
alert.loading('Guardando...')
try {
  await mutation.mutateAsync(data)
  alert.closeLoading()
  alert.toast('Guardado correctamente')
} catch {
  alert.closeLoading()
  alert.toast('Error al guardar', 'error')
}
```

---

## Engineering Principles

Estas reglas son **obligatorias** en todas las tareas. Claude Code debe actuar como arquitecto de software, no como generador de código. Aplicar siempre, sin esperar instrucción del usuario.

### Arquitectura

- Antes de escribir cualquier código, analizar la mejor arquitectura para la funcionalidad en el contexto de este proyecto (Feature-based + TanStack Query + Zustand + HeroUI v3).
- Priorizar mantenibilidad, escalabilidad y legibilidad por encima de velocidad de implementación.
- Aplicar SOLID, especialmente **Single Responsibility Principle**: cada módulo, componente, hook y servicio tiene una única razón para cambiar.
- Favorecer composición de componentes pequeños sobre componentes monolíticos.
- Mantener bajo acoplamiento entre features. Una feature no debe importar directamente de otra — usar `shared/` para código transversal.
- Respetar siempre la estructura `features/<name>/{types,schemas,services,hooks,components,pages}`.

### Componentes

- Nunca crear componentes demasiado grandes. Si un componente supera ~150 líneas, dividirlo inmediatamente.
- Extraer subcomponentes reutilizables desde el inicio, no después.
- Un componente debe tener una única responsabilidad: o renderiza UI o coordina lógica, nunca ambas cosas en profundidad.
- Los archivos `*Page.tsx` solo orquestan: montan layout, delegan a hooks y abren modales. No contienen JSX complejo ni lógica de negocio directa.
- Formularios siempre en su propio componente (`*Form.tsx`) dentro de `features/<name>/components/`. Nunca inline en una Page.
- Columnas de tabla complejas extraer a subcomponentes o funciones render fuera del componente principal.

### Funciones

- Funciones máximo ~40 líneas. Si crece, extraer funciones auxiliares con nombre descriptivo.
- Evitar más de 2 niveles de anidación (if dentro de if dentro de map). Extraer o invertir condiciones.
- Handlers de eventos en Pages (`handleCreate`, `handleEdit`) solo llaman a mutation + alert. Sin lógica de transformación — esa va en el servicio o en el hook.

### Hooks personalizados

- Toda lógica que mezcle estado + efectos + queries debe vivir en un hook propio en `features/<name>/hooks/`.
- Nunca mezclar `useQuery`/`useMutation` directamente dentro de componentes visuales. Siempre envolverlos en hooks de la feature (ej: `useUsuarios`, `useCreateUsuario`).
- Si el mismo patrón de query/mutation aparece en más de un lugar, extraer a `shared/hooks/`.
- Hooks de TanStack Query siempre con `queryKey` tipado, `placeholderData: keepPreviousData` en listas paginadas, e `invalidateQueries` en `onSuccess` de mutations.

### Servicios

- Toda llamada a la API vive en `features/<name>/services/<name>.service.ts` usando `import api from '@/lib/axios'`.
- Los servicios exportan un objeto (`export const xService = { getAll, create, update, delete }`) — nunca funciones sueltas.
- Los servicios no manejan errores de UI (no llaman a `alert`). Solo lanzan el error para que el hook/page lo capture.
- Transformaciones de datos (mapeos, normalizaciones) van en el servicio, no en el componente.

### Schemas y tipos

- Siempre definir schemas Zod en `features/<name>/schemas/` antes de crear el formulario.
- Exportar los tipos inferidos (`type XValues = z.infer<typeof xSchema>`) desde el mismo archivo del schema.
- Las interfaces de dominio van en `features/<name>/types/`. Los schemas Zod son para validación de formularios, no para tipar el API response.
- Usar `ROLES`, `STATUS`, etc. como `as const` arrays cuando hay valores enum fijos — nunca strings mágicos dispersos.

### Organización y reutilización

- Antes de crear un componente nuevo, verificar si existe algo reutilizable en `shared/components/`.
- Formularios usan siempre `FormInput`, `FormSelect`, etc. de `@/shared/components/forms/`. Nunca `<input>` crudo salvo casos justificados.
- `DataTable` de `@/shared/components/tables/` para todas las tablas. No crear tablas custom.
- `useModal()` + `GlobalModal` para todos los modales. No usar HeroUI Modal directamente.
- `alert.*` de `@/shared/utils/alert` para todos los toasts/confirmaciones. No usar `window.alert`, `console.log` ni Swal directo.
- `cn()` de `@/shared/utils/cn` para todas las clases condicionales.

### Límites de tamaño — se aplican automáticamente

| Unidad | Límite recomendado | Acción si se supera |
|---|---|---|
| Función / handler | ~40 líneas | Extraer función auxiliar |
| Componente | ~150 líneas | Dividir en subcomponentes |
| Archivo | ~300 líneas | Reorganizar en múltiples archivos |
| Hook | ~80 líneas | Separar responsabilidades |
| Servicio | ~60 líneas | Dividir por entidad/operación |

Si al escribir código se supera algún límite, **refactorizar antes de continuar**. No esperar al final de la tarea.

### Auto-revisión obligatoria antes de terminar cualquier tarea

Antes de declarar una tarea completa, verificar:

1. **¿Hay código duplicado?** → Extraer a `shared/` o a un helper de la feature.
2. **¿El componente puede dividirse?** → Crear subcomponentes con nombre descriptivo.
3. **¿Puede extraerse un hook?** → Mover lógica de estado/query a `features/<name>/hooks/`.
4. **¿Puede extraerse un servicio?** → Mover llamadas API fuera del componente.
5. **¿Hay demasiada lógica en la Page?** → Pages solo orquestan; la lógica va en hooks y servicios.
6. **¿Algún archivo superó el límite de tamaño?** → Reorganizar.
7. **¿La solución respeta la arquitectura feature-based del proyecto?** → Verificar ubicación de cada archivo creado.
8. **¿Pasó el type-check?** → Ejecutar `pnpm exec tsc -b` siempre antes de terminar.

Si alguna respuesta es **sí**, refactorizar antes de considerar la tarea terminada. Claude nunca debe esperar a que el usuario solicite una refactorización — es responsabilidad automática.
