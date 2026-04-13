# seo

## Purpose
SEO utilities: meta tags, JSON-LD structured data, sitemap, robots.txt.

## Critical Rules
- ALWAYS escape user content in meta tags (XSS prevention)
- ALWAYS use env.PUBLIC_APP_URL for absolute URLs — never hardcode
- ALWAYS include JSON-LD structured data on every public page
