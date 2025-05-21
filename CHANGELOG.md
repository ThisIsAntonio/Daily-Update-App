# Changelog

All notable changes to this project will be documented in this file.

---
## [v2.3.1] - 2025-05-21

### Added
- 🧪 Complete test coverage using Vitest and React Testing Library
- ✅ New test files:
  - `NavBar.test.tsx`, `LoginScreen.test.tsx`
  - `UpdatesList.test.tsx`, `UpdateItem.test.tsx`, `UpdateFilters.test.tsx`
  - `AddUpdateButton.test.tsx`, `PrimaryButton.test.tsx`, `ThemeToggle.test.tsx`
  - `SummaryCard.test.tsx`, `TopWordsPanel.test.tsx`, `MostVerboseDay.test.tsx`
  - `WordStatsByDay.test.tsx`, `UpdatesPerDayChart.test.tsx`
  - `DashboardView.test.tsx`, `DashboardView.integration.test.tsx`, `DashboardView.smoke.test.tsx`

### Changed
- 🧼 Improved test organization by moving test files into `__tests__` directory
- ♻️ Refactored `NavBar` to simplify testability
- ✅ Updated Vitest config and ESLint for consistency

### Fixed
- ✅ Resolved testing issues with `AuthContext` and `useDarkMode` mock
- 🐞 Fixed various test errors caused by async rendering and DOM roles

## [v2.3.0] - 2025-05-19

### Added
- New **Footer component** with:
  - Links to GitHub, LinkedIn, and personal website.
  - Footer content with "© 2025 Daily Update App. Built with ❤️ using Next.js, Tailwind, and TypeScript."
  - Developer credit and rights reserved statement.

### Changed
- Refactored **`NavBar`** to include reusable components like `PrimaryButton`, `ThemeToggle`, and `AppHeaderTitle`.
- Cleaned up code in **`DashboardView`** by making it more modular with reusable components like `UpdatesList`, `UpdateItem`, and `WordStatsByDay`.
- Improved the structure and readability of the UI logic.

### Fixed
- Fixed layout issues where footer was not showing properly on some screens (adjusted `min-height` and `overflow` styles).
- Improved scroll behavior by making the footer responsive and hiding it when not in use.

## [v2.2.0] - 2025-05-19
### Changed
- Refactored layout components in preparation for further UI modularity
- Extracted and reused:
  - `PrimaryButton` for all core CTA buttons
  - `ThemeToggle` for dark/light theme switch
  - `AppHeaderTitle` for title consistency
- Cleaned up `NavBar` and improved its clarity
- Refactored update list logic from `DashboardView` into `UpdatesList` and `UpdateItem` components
- Cleaned up conditional rendering for loading and empty state

### Added
- New reusable `UpdateItem` component to display a single update
- `UpdatesList` to wrap logic and list presentation
- `AppHeaderTitle` to provide a consistent title component
- `PrimaryButton` for consistent button styles
- `ThemeToggle` for easy theme switching
- `NavBar` for a more structured navigation bar

## [2.1.0] - 2025-05-19

### Added
- New tests for `DashboardView` filters (date range and combined filters).
- New tests for `navbar`.
- Split test logic into base and advanced filtering files for clarity.

### Fixed
- Improved test reliability by explicitly selecting date inputs and placeholders.

## [2.0.0] - 2025-05-18

### Added
- Date range filtering for updates
- Text search functionality
- Clear filters button with matching UI style
- Enhanced filtering logic (client-side with preserved full dataset)
- Calendar-based word tracking (Words by Day)
- Improved layout for date inputs and filter controls

### Changed
- Refactored dashboard logic to separate filtered vs all updates
- Now displays full analytics regardless of filtering
- Improved scroll behavior (disabled infinite scroll on active filters)

### Fixed
- Calendar word count display not updating
- Filtering returning no results even with valid data
- Date parsing issues with filter ranges

---

## [1.1.0] - 2025-05-17

### Added
- Analytics widgets:
  - Updates per Day (area chart)
  - Top 5 Words (pie chart)
  - Words by Day (calendar + bar chart)
  - Most Word-Heavy Day
- Infinite scroll for updates when filters are not applied

---

## [1.0.0] - 2025-05-03

### Added
- User login simulation
- Submit daily updates
- View updates dashboard
- Dark/light theme toggle
- API routes for create + fetch updates
- Prisma DB setup (SQLite)