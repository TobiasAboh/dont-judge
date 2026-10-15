# Don't Judge

A deployed anonymous-confessions social application where people can share and receive anonymous messages.

**Live app:** [dontjudge.vercel.app](https://dontjudge.vercel.app)

![Don't Judge application preview](https://github.com/user-attachments/assets/f064619b-7ad8-40c9-adb1-d35e2c81cb67)

## Overview

Don't Judge is a social web application focused on anonymous confessions. This project demonstrates building and deploying a modern Next.js application with data persistence and real-time communication tooling.

## Tech stack

- **Framework:** Next.js 15
- **UI:** React 19, Tailwind CSS
- **Database / ODM:** MongoDB with Mongoose
- **Real-time communication:** Socket.IO
- **UI motion:** Framer Motion
- **Utilities:** React Icons, js-cookie, html2canvas

## Development

Requires Node.js and npm.

```bash
git clone https://github.com/TobiasAboh/dont-judge.git
cd dont-judge
npm install
```

Create a local environment file for any database connection strings or other configuration required by the application. Keep credentials out of source control.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create a production build with:

```bash
npm run build
npm run start
```

## Engineering areas demonstrated

- Building a multi-page React application with Next.js
- Connecting a web app to persistent data using Mongoose
- Integrating Socket.IO client/server packages for real-time features
- Styling and motion in a responsive interface
- Deploying a Next.js app to Vercel

## Links

- **Live application:** https://dontjudge.vercel.app
- **Source code:** https://github.com/TobiasAboh/dont-judge
