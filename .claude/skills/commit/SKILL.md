---
name: commit
description: Analiza los cambios del repositorio, genera un mensaje de commit siguiendo Conventional Commits y ejecuta `git add . && git commit` automáticamente sin pedir confirmación. Usar cuando el usuario ejecute /commit o pida hacer un commit.
---

Al ejecutarse este skill, sigue estos pasos en orden sin pedir confirmación en ningún momento:

## Paso 1 — Verificar estado del repositorio

Ejecuta `git status --short` para ver los archivos modificados.

- Si la salida está vacía (sin cambios), informa: "No hay cambios para confirmar." y termina aquí.
- Si hay cambios, continúa al paso 2.

## Paso 2 — Stagear todos los cambios

Ejecuta `git add .` sin confirmación.

## Paso 3 — Analizar el diff cacheado

Ejecuta `git diff --cached --stat` para obtener un resumen de los archivos y líneas cambiadas.

Luego ejecuta `git diff --cached` para leer el contenido real de los cambios. Analiza:

- Qué archivos cambiaron y en qué directorios
- Qué funcionalidad se agregó, modificó o eliminó
- El propósito general del cambio

## Paso 4 — Elegir el tipo Conventional Commits correcto

Selecciona el tipo según el contenido del diff:

| Tipo       | Cuándo usarlo |
|------------|---------------|
| `feat`     | Nueva funcionalidad visible para el usuario |
| `fix`      | Corrección de un bug |
| `refactor` | Reorganización de código sin cambiar comportamiento |
| `perf`     | Mejora de rendimiento |
| `style`    | Cambios de formato, CSS, clases Tailwind (sin lógica) |
| `test`     | Agregar o modificar pruebas |
| `docs`     | Documentación únicamente |
| `chore`    | Dependencias, configs, archivos de build |
| `ci`       | Configuración de CI/CD |
| `revert`   | Reversión de un commit anterior |

Si los cambios abarcan múltiples tipos, usa el tipo del cambio más relevante o significativo.

## Paso 5 — Generar el mensaje de commit

Construye el mensaje siguiendo esta estructura:

```
<tipo>(<scope opcional>): <descripción en infinitivo, máx 72 chars>
```

Reglas del mensaje:
- **Descripción**: en español, verbo en infinitivo, sin mayúscula inicial, sin punto final
- **Scope**: nombre del módulo o feature afectado (ej: `usuarios`, `clientes`, `auth`, `sidebar`). Omitir si el cambio es transversal
- **Conciso**: describe el QUÉ y el POR QUÉ en una línea. No describas el CÓMO
- No incluyas body ni footer a menos que haya información crítica que no cabe en el subject (breaking change, cierre de issue)

Ejemplos correctos:
```
feat(usuarios): agregar paginación con perPage dinámico
fix(auth): corregir redirección tras logout en rutas protegidas
perf: reemplazar framer-motion por CSS transitions en Sidebar
refactor(alert): extraer loading/closeLoading a utilidad compartida
chore: actualizar dependencias de vite y tailwind
style(clientes): ajustar colores de badge de estado
```

## Paso 6 — Ejecutar el commit

Ejecuta:

```bash
git commit -m "<mensaje generado>"
```

No uses `--no-verify`. No uses `--amend`. Crea siempre un commit nuevo.

## Paso 7 — Confirmar resultado

Muestra al usuario:
- El mensaje de commit usado
- El hash corto del commit creado (obtenido con `git log --oneline -1`)
- Los archivos incluidos (resumen de `git diff HEAD~1 --stat`)

Formato de respuesta final (caveman, una línea por dato):
```
✓ commit: <hash> — <mensaje>
  archivos: <lista corta>
```

## Manejo de errores

- Si `git commit` falla por hook pre-commit: muestra el error exacto, corrige el problema (ej: errores de lint/formato) y reintenta el commit.
- Si el repositorio no tiene commits previos (repo vacío): usa `git commit` normalmente, funciona igual.
- Nunca uses `--no-verify` para saltarte hooks fallidos — corrígelos primero.
