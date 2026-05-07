# Changelog

## Unreleased

### Added
- GitHub Markdown Alerts (admonitions) support - NOTE, TIP, IMPORTANT, WARNING, CAUTION
- Light mode syntax highlighting with proper contrast
- Tag archive page with clickable tags in posts
- 404 page with themed layout
- `prefers-reduced-motion` support for theme transitions
- `aria-label` and `aria-pressed` on theme toggle button
- `robots.txt` with sitemap reference
- `jekyll-sitemap` for automatic sitemap generation
- `.ruby-version` file for consistent Ruby version management
- `.editorconfig` for cross-editor formatting consistency
- `bin/build` script for production builds
- `Makefile` with setup, serve, build, and clean targets
- `netlify.toml` deployment configuration
- GitHub Actions workflows for build validation and Pages deployment
- Font preconnect hints for faster loading
- DNS prefetch for Soopr SDK

### Changed
- Moved Google Fonts from render-blocking SCSS imports to non-blocking link tags
- Updated gem dependencies: Jekyll ~> 4.3, rouge ~> 4.2, jekyll-feed ~> 0.17, webrick ~> 1.8
- Theme toggle button uses static positioning on mobile (no longer overlaps content)
- Improved `bin/bootstrap` with Ruby version check
- Improved `bin/start` with `--livereload` and passthrough flags
- Soopr twitter handle now reads from `_config.yml` instead of being hardcoded
- Tags in posts now link to tag archive page
- Improved 404 page with minimal themed layout
- Gemspec now includes `_data/` directory in packaged files

### Fixed
- Undefined CSS variable `--border` in blockquote styles (now uses `--text`)
