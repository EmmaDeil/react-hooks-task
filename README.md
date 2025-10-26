# PersonalTask (react-hooks-task)

A small Vite + React project demonstrating React Hooks and a simple task list UI.

This repository contains a lightweight task manager built with React 19 and Vite. It's intended as a learning/example project for hooks like useState, useEffect, useContext, createContext, and ThemeContext and small component composition.

## Features

- Add and remove tasks
- Simple form component and contextual theme support
- ESLint configured for basic linting

## Tech stack

- React 19
- Vite (development server + build)
- ESLint

## Prerequisites

- Node.js (>=16 recommended)
- npm (or yarn/pnpm) — examples below use npm

This workspace is used on Windows with a bash shell (WSL or Git Bash). The commands below are compatible with bash.

## Setup

From the project root, install dependencies:

```bash
npm install
```

## Available scripts

The project `package.json` exposes these scripts:

- `npm run dev` — start Vite development server
- `npm run build` — build production bundle with Vite
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint on the project

Run the dev server:

```bash
npm run dev
```

Open http://localhost:5173 (or the URL shown in the terminal) in your browser.

## Project structure (high level)

- `index.html` — app entry
- `src/main.jsx` — React entry
- `src/App.jsx` — root app component
- `src/components/` — UI components (e.g., `TaskForm.jsx`)
- `src/ThemeContext.jsx` — theme context provider

## Linting

Run ESLint:

```bash
npm run lint
```

## Notes & assumptions

- This README was created/updated to provide setup and run instructions. I assumed the project is a simple demo app; if you want a longer docs section (screenshots, examples, or CI badges), tell me what to include.
- Node version: if you need an engines field or `.nvmrc`, I can add one.

## Next steps (suggested)

- Add a short demo GIF or screenshot to show the UI
- Add unit tests (Jest + React Testing Library) and a `npm test` script
- Add a CONTRIBUTING.md and codeowners or license file if you plan to share this publicly

---

Updated README on: 2025-10-26

