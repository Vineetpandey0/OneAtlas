# AI App Generator

Build a system that converts structured JSON into a working web application with dynamic UI, backend APIs, database storage, and authentication.

---

## Overview

AI App Generator is a config-driven platform that lets users create applications by pasting a structured JSON configuration. The system normalizes imperfect input, generates runtime pages dynamically, exposes generic CRUD APIs, and stores data in a database.

Instead of hardcoding each app, the platform interprets configuration at runtime.

---

## Features

* JSON-based app creation
* Dynamic frontend rendering
* Generic backend CRUD APIs
* PostgreSQL-based data storage
* Authentication and user-scoped access
* Config validation and normalization
* Support for imperfect or partial config
* Extensible component registry
* Optional features such as:

  * CSV import
  * localization
  * comparison views

---

## How It Works

1. The user submits JSON configuration.
2. The system validates and normalizes the config.
3. The config is stored in the database.
4. The runtime engine reads the config.
5. Frontend pages are rendered dynamically.
6. Backend APIs handle CRUD operations generically.
7. User data is stored against the correct app and user.

---

## Project Structure

```txt
src/
├── app/
│   ├── (builder)/
│   │   ├── dashboard/
│   │   ├── create/
│   │   ├── apps/
│   │   └── layout.tsx
│   ├── (runtime)/
│   │   └── app/
│   │       └── [appId]/
│   │           └── [...slug]/
│   ├── (auth)/
│   ├── api/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── lib/
├── prisma/
├── types/
├── hooks/
├── store/
└── features/
```

---

## Core Concepts

### Builder Platform

The main website where users create, edit, and manage apps.

### Runtime Engine

The part of the system that reads config and renders the generated app.

### Normalizer

A layer that converts incomplete or inconsistent JSON into a safe internal schema.

### Generic API Layer

A backend layer that handles any entity using the same CRUD logic.

### Database Layer

Stores app configs, records, and user data.

---

## Tech Stack

* **Frontend:** Next.js, React, TypeScript
* **Backend:** Next.js Route Handlers or Node.js APIs
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Auth:** JWT or session-based authentication
* **Styling:** Tailwind CSS

---

## Folder Guide

### `app/`

Contains routing, pages, and API routes.

### `components/`

Contains reusable UI components for builder and runtime screens.

### `lib/`

Contains core logic such as normalization, routing helpers, auth helpers, and database utilities.

### `features/`

Contains optional feature modules like CSV import, localization, and comparison.

### `prisma/`

Contains the database schema and migrations.

### `types/`

Contains TypeScript type definitions.

### `hooks/`

Contains reusable React hooks.

### `store/`

Contains global state stores.

---

## Example Config

```json
{
  "app": {
    "name": "College Explorer",
    "defaultLanguage": "en"
  },
  "entities": [
    {
      "name": "College",
      "fields": [
        { "name": "name", "type": "string", "required": true },
        { "name": "fees", "type": "number" },
        { "name": "rating", "type": "number" }
      ]
    }
  ],
  "ui": {
    "pages": [
      { "path": "/colleges", "type": "table", "entity": "College" },
      { "path": "/colleges/add", "type": "form", "entity": "College" }
    ]
  }
}
```

---

## Runtime Behavior

* `/app/[appId]/...` renders pages dynamically
* `/api/app/[appId]/[entity]` handles CRUD operations
* The system reads config and decides what component to render
* Unknown or missing fields are handled gracefully

---

## Database Model (Conceptual)

* **apps**: stores app metadata and config
* **records**: stores dynamic entity data
* **users**: stores authentication data

---

## Recommended MVP Scope

For a fast and reliable build, focus on:

1. Config upload / creation
2. Normalization
3. Dynamic form rendering
4. Dynamic table rendering
5. Generic CRUD APIs
6. Authentication
7. One strong feature such as comparison or CSV import

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file and add your database and auth credentials.

### 3. Run migrations

```bash
npx prisma migrate dev
```

### 4. Start development server

```bash
npm run dev
```

---

## Goals

* Build a reliable config-driven platform
* Support imperfect input without breaking
* Keep the architecture extensible
* Demonstrate full-stack system thinking

---

## Submission Checklist

* Working live demo
* GitHub repository
* Short explanation video
* Clean architecture
* Graceful
