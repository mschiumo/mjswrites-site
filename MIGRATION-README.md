# MJS Writes — Blog Migration Playbook

## Key finding from the trial (July 2026)

GoDaddy Websites + Marketing renders blog post bodies **client-side with
JavaScript**. A plain HTTP fetch (curl, requests, wget) of a post URL like
`https://mjswrites.com/f/one-day-youll-pretend` returns the site shell only.

Reliably present in the static HTML (via meta tags):
- Post title (`og:title`)
- Opening line / excerpt (`og:description`)
- Hero image URL (`og:image`, hosted on img1.wsimg.com)
- Canonical URL

NOT present in static HTML (needs a rendered page):
- Full post body
- Publish date
- Category/tags (except where visible in indexed URLs, e.g. `?blogcategory=Travel`)

## Recommended approach (Claude Code)

### Step 0 — Try the RSS feed first (5 minutes, may skip everything else)
GoDaddy blogs usually expose an RSS feed. Try, in order:
- https://mjswrites.com/f.rss
- https://mjswrites.com/blog/f.rss
- View source of https://mjswrites.com/blog and search for "rss" / "application/rss+xml"

If the feed exists and contains full post bodies + dates, parse it directly —
no browser automation needed. RSS feeds may only include recent posts, so
check the item count against the blog index.

### Step 1 — Enumerate all posts
- Fetch https://mjswrites.com/sitemap.xml (GoDaddy auto-generates one) and
  collect every URL matching `/f/*`.
- Cross-check against the rendered blog index page (it may paginate).

### Step 2 — Scrape with a rendered browser
Use Playwright (Python or Node). For each post URL:
1. Load the page, wait for network idle.
2. Extract: title, publish date, category, body HTML (the post content
   container — inspect one post to find the selector; it sits below the
   title/date block and above the "Hot Off the Press" site shell content).
3. Convert body HTML -> Markdown (e.g. `markdownify` / `turndown`).
   Blog posts here are often poems — PRESERVE LINE BREAKS. Convert single
   newlines to hard breaks (trailing double-space or <br>), not merged
   paragraphs.
4. Download the hero image and any inline images to images/, strip the
   wsimg.com crop/resize URL parameters (`/:/cr=...` suffix) to get the
   original, and rewrite references.
5. Write frontmatter: title, slug, date, category, excerpt, heroImage,
   originalUrl.

Suggested Claude Code prompt:
  "Using Playwright, crawl every /f/ post URL in mjswrites.com/sitemap.xml,
   render each page, extract title/date/category/body, convert to markdown
   files with frontmatter in content/blog/, download images to images/ and
   rewrite links. Poems must keep their line breaks. Then show me a diff-style
   summary of every post captured vs the sitemap list."

### Step 3 — Verify before canceling GoDaddy
- Count: markdown files == posts in sitemap/index.
- Spot-check 3 posts against the live site, especially poem line breaks.
- Confirm every image downloaded (no remaining img1.wsimg.com references).

### Step 4 — Redirects on the new site
Old URLs are indexed at /f/{slug}. In vercel.json:
  { "redirects": [ { "source": "/f/:slug", "destination": "/blog/:slug", "permanent": true } ] }

### Also worth importing
Medium posts (medium.com/@amanicmillennial): use Medium's official export
(Settings -> Download your information) which returns HTML files; convert the
same way. Note Medium RSS excludes paywalled stories' full text.
