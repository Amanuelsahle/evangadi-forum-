# Evangadi Forum — Client

> The React frontend for the Evangadi Forum — a community Q&A platform where users can ask questions, post answers, and explore discussion threads.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [Routes](#routes)

---

## Overview

The Evangadi Forum client is a **React 18** single-page application that provides the full user-facing interface for the forum. It handles authentication, question browsing, answer threads, and new question submission — communicating with the [Evangadi Forum Backend](../backend/README.md) via an Axios-powered API layer with automatic JWT injection.

---

## Features

- Login and registration screens with JWT-based authentication
- Home feed listing all forum questions
- Question detail view with full answer threads
- Ask a question flow for authenticated users
- Persistent auth via `localStorage` token storage
- Shared header, footer, and multi-page routing with React Router

---

## Tech Stack

| Layer       | Technology                   |
| ----------- | ---------------------------- |
| Framework   | React 18                     |
| Routing     | React Router DOM             |
| HTTP Client | Axios (with JWT interceptor) |
| Build Tool  | Create React App             |

---

## Project Structure

```
evangadi-forum-client/
├── src/
│   ├── App.js                        # Top-level routing and auth state
│   ├── axiosConfig/
│   │   └── axiosConfig.js            # Shared Axios instance with token injection
│   ├── pages/                        # Full page components (auth, forum, support)
│   ├── components/                   # Shared UI components (Header, Footer)
│   └── assets/                       # Static images and icons
└── public/                           # HTML template and public assets
```

---

## Prerequisites

Before getting started, ensure you have:

- [Node.js 18+](https://nodejs.org/) and npm
- The [Evangadi Forum Backend](../backend/README.md) running locally or deployed

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-org/evangadi-forum-client.git
cd evangadi-forum-client
npm install
```

---

## Environment Variables

Create a `.env` file in the project root with the following variable:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

| Variable            | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `REACT_APP_API_URL` | Base URL for the backend API used by the Axios client |

The Axios instance reads this value from `process.env.REACT_APP_API_URL` and automatically attaches the JWT stored in `localStorage` to every authenticated request.

---

## Running the App

Start the development server:

```bash
npm start
```

The app runs at `http://localhost:3000` by default.

---

## Available Scripts

| Script          | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| `npm start`     | Start the development server with hot reload                |
| `npm test`      | Run the test suite                                          |
| `npm run build` | Create an optimized production build                        |
| `npm run eject` | Expose the CRA build config (irreversible, not recommended) |

---

## Routes

| Path            | Auth Required | Description                       |
| --------------- | :-----------: | --------------------------------- |
| `/`             |      Yes      | Home feed — lists all questions   |
| `/login`        |      No       | User login                        |
| `/register`     |      No       | New user registration             |
| `/askquestion`  |      Yes      | Submit a new question             |
| `/question/:id` |      Yes      | Question detail and answer thread |
| `/how-it-works` |      No       | Informational / onboarding page   |

---

_Part of the Evangadi Forum — a community-driven Q&A platform._
