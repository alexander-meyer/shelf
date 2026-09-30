# shelf

A personal "digital shelf" for keeping track of the books you've read and the movies you've watched, and curating lists of your favorite items or themes.

## Goals

- **One place for everything you've enjoyed.** Books and movies live side by side on a single shelf.
- **Curated collections.** Group items of different kinds under a theme (e.g. a "dark fantasy" collection with books *and* movies in it).
- **Consolidate existing libraries (long-term).** Eventually import from services like Letterboxd (watched) and Goodreads/StoryGraph (read).
- **Music later.** Albums are out of scope for now but the data model should make adding them easy.

## Current state

This is an early proof of concept. Only the front-end scaffold exists so far; there is no real data or backend yet.

**Done**

- Vite + React + TypeScript project scaffold
- Tailwind CSS and shadcn/ui set up
- TanStack Router (file-based routing) and TanStack Query wired into `main.tsx`
- Path alias (`@/` → `src/`) configured for Vite, TypeScript, and shadcn
- Root layout and a placeholder index route

**Next**

- Types for `Book`, `Movie`, and `Collection`
- Mock data and a small data-access module (`getBooks()`, `getMovies()`) consumed through TanStack Query
- Home page with a search bar (search term kept in the URL) and book/movie sections built from a shared `MediaCard`
- Detail dialog for an item
- Collections: create, add items, and a `/collections/$id` route

**Later**

- Manual "add item" form (JSON-schema-driven with RJSF)
- Runtime config via `window.__CONFIG__` for the future API base URL
- A real API for metadata and cover images, plus imports from external services

## Tech stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [TanStack Router](https://tanstack.com/router) and [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com) (Radix primitives)
- [oxlint](https://oxc.rs/docs/guide/usage/linter) for linting

## Getting started

**Prerequisites:** Node 20.19+ (or 22.12+) and [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm dev
```

The dev server runs at http://localhost:5173.
