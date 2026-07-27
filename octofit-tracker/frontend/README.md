# Octofit Tracker Frontend

React 19 presentation tier for the Octofit multi-tier app.

## Environment setup

Define `VITE_CODESPACE_NAME` so the app can build the Codespaces API host:

```bash
# octofit-tracker/frontend/.env.local
VITE_CODESPACE_NAME=your-codespace-name
```

When set, API calls use:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When unset, the frontend safely falls back to:

```text
http://localhost:8000/api/[component]/
```

This prevents malformed URLs such as `https://undefined-8000.app.github.dev`.

## Run

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
