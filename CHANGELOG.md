# Changelog

All notable changes to this project will be documented in this file.

---
## [2.1.0] - 2025-05-19

### Added
- New tests for `DashboardView` filters (date range and combined filters).
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