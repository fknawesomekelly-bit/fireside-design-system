# Fireside Design System

Multi-brand design system shared across all Fireside Press products.

## Architecture
- Tokens: W3C Design Tokens v1.0, Style Dictionary v4
- Components: shadcn/ui pattern (Radix Primitives + Tailwind + cva)
- Reference: Primer (tokens) + Carbon (monorepo) + shadcn (components)

## Multi-brand mechanism
Single semantic key set, brand colors swapped via `<html data-brand="aventor">`.

## Validation
`pnpm validate` — runs locally, in pre-commit, and in CI.

## Branch protection
main requires PR + passing CI. No direct push.
