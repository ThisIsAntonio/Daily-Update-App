# Daily Update App

A full-stack internal tool where users can submit daily updates, built with the T3 Stack (Next.js, TypeScript, Prisma).

## ✨ Features

- ✅ Submit daily updates via a simple form
- ✅ Dashboard with all previous updates
- ✅ Simulated login with dynamic user ID
- ✅ Logout support
- ✅ Filter updates by user ID
- ✅ Dark/light theme toggle
- ✅ Analytics: updates per day, total count, top words
+ - ✅ Date range filtering for updates
+ - ✅ Search updates by content
+ - ✅ Calendar-based word tracking per day
+ - ✅ Clear filters button with elegant UI
+ - ✅ Infinite scrolling (when no filters applied)


## 🚀 Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS 4 (with custom dark mode)
- TypeScript
- Prisma + SQLite
- Recharts for data visualization

## 📦 Setup

```bash
pnpm install
pnpm exec prisma migrate dev --name init
pnpm dev
```

## 🔍 Demo Instructions

1. Run the app: `pnpm dev`
2. Enter any name to simulate login.
3. Submit updates via the "+ Add Update" button.
4. Try searching or filtering updates by date.
5. Explore the analytics on the right side!


## 🖼 Screenshots

| Login Screen | Navbar with User |
|--------------|------------------|
| ![Login](./img/login-screen.png) | ![Navbar](./img/navbar-logged.png) |

| Update Form | Form Code |
|-------------|------------|
| ![Form](./img/update-form.png) | ![Code Page](./img/code-page-tsx.png) |

| Dashboard (Light) | Dashboard (Dark) |
|-------------------|------------------|
| ![Dashboard Light](./img/dashboard-light.png) | ![Dashboard Dark](./img/dashboard-dark.png) |

| Date Filter & Search | Words by Day |
|----------------------|---------------|
| ![Date Filter](./img/date-filter-ui.png) | ![Words By Day](./img/words-by-day.png) |

## 🔐 Auth Simulation

A lightweight login form asks the user for their name, which is saved in localStorage. All updates are filtered per user ID. Users can log out and switch users at any time.

## 📁 Folder Structure

- `/src/app`: App Router structure
- `/src/components`: Reusable components
+ - `/src/components/DashboardView.tsx`: Main dashboard logic and rendering
+ - `/src/context/AuthContext.tsx`: Simulated auth logic
- `/src/hooks`: Custom React hooks (e.g., `useDarkMode` for theme toggling)
- `/src/app/api/updates/route.ts`: API route for creating and retrieving updates using Prisma
- `/src/server/db.ts`: Prisma client instance
- `/prisma/schema.prisma`: Prisma DB schema
- `/img`: Screenshots for README


## 📝 License

This project is licensed under the [MIT License](./LICENSE) © 2025 Marcos Astudillo

