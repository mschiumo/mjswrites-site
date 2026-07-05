# CLAUDE.md — mjswrites-site

## What this project is

Rebuild of mjswrites.com — the author site for Michael J. Schiuma (MJ), writer
of the memoir *(In)Sane: Memoirs of a Manic Millennial* and three poetry
collections (*words to love by*, *to be loved by a poet*, *from new york,
with love*). The current site is a GoDaddy Websites+Marketing template being
replaced with a custom static site deployed on Vercel. MJ also sells custom
typewriter-typed poetry on Etsy.

## Session handoff — decisions already made (July 2026, claude.ai chat)

1. **Design is decided — `design/handoff/` is the source of truth**
   (July 6 2026 hifi handoff; see `design/handoff/README.md` for full design
   tokens, page specs, and interaction notes). It SUPERSEDES the earlier
   `design/mjswrites-redesign.html` concept (ink-navy/typewriter direction),
   which is retained for history only.
   - Palette: warm paper #F6EEE3, ink #2C2320, accent burnt orange #C6633A
     (full token table in the handoff README).
   - Type: Newsreader (display/body serif, heavy italics), Instrument Sans
     (UI), Caveat (handwritten accents), Courier Prime (typewriter tags).
   - Five page templates: Home, Shop, Blog index (category filter),
     Article, Contact — prototypes in `design/handoff/*.dc.html` are visual
     specs to recreate in the framework, NOT production code to ship.
   - The 3 sample articles in `design/handoff/journal/` are starter drafts —
     real post bodies come from the blog migration (`content/blog/`).
   - The "Between Two" poem on Shop is real client copy (keep verbatim,
     rendered as HTML not an image).

2. **Stack plan:** static site (Astro preferred; Next.js acceptable),
   markdown-based blog in `content/blog/`, deployed via GitHub → Vercel
   auto-deploy. Domain stays registered at GoDaddy; DNS points to Vercel.
   MJ already has a Vercel account. Vercel Hobby terms are a gray area for
   an author-promo site — flagged to MJ; Cloudflare Pages is the fallback.

3. **Analytics plan:** Vercel Web Analytics (free on Hobby, ~50k events/mo)
   for pageviews/referrers + GA4 or Umami for outbound click tracking
   (Amazon/Etsy buy buttons, trailer plays). Vercel custom events are
   Pro-only — don't rely on them.

4. **Blog migration: DONE (July 6 2026).** All 111 posts from the live
   site are in `content/blog/` as markdown with frontmatter (title, slug,
   date, categories, excerpt, heroImage, originalUrl); all 218 images in
   `images/` at original resolution. Poem line breaks preserved as hard
   breaks. Internal links rewritten to `/blog/{slug}`. (Historical how-to
   in `MIGRATION-README.md`; note Playwright wasn't needed — headless
   Chrome `--dump-dom` did the job.)

5. **SEO:** old URLs are indexed. Add vercel.json redirect
   `/f/:slug → /blog/:slug` (permanent).

6. **Commerce:** no cart on the new site. Buy links go out to Amazon
   (books) and Etsy (custom poetry). Newsletter: launched WITHOUT email
   capture (July 6 2026 decision) — the newsletter bands and Shop
   notify-me form were removed rather than shipping forms that silently
   drop signups. `src/components/Newsletter.astro` is kept unused; when
   MJ picks a provider (Buttondown or Mailchimp), wire it and re-add the
   bands to Home + Blog.

7. **Publishing workflow (decided July 6 2026): Claude Code flow, no CMS
   for now.** To publish a post, MJ gives Claude Code the text + images;
   Claude Code writes the markdown to `content/blog/` (matching the
   frontmatter conventions of the migrated posts), puts images in
   `images/`, commits, and pushes — Vercel auto-deploys. No admin
   backend is built into the site. FUTURE: if a self-serve editing UI is
   ever needed, the chosen direction is **Sanity** (hosted headless CMS) —
   revisit content-loading in the Astro build at that point.

## Immediate next steps (in order)

Done so far: repo created (PR #1), blog migration complete, hifi design
handoff landed in `design/handoff/`.

1. Scaffold Astro project; recreate the `design/handoff/` templates
   (Home, Shop, Blog index, Article, Contact) as components/layouts per
   the handoff README; wire `content/blog/` as a content collection.
2. Add vercel.json redirects, connect repo to Vercel, point GoDaddy DNS.
3. Ask MJ for: real form endpoints (contact + newsletter provider), and
   the Etsy prints listing when live.

## Working agreements

- Confirm with MJ before any deploy to the production domain.
- Don't cancel or touch anything on GoDaddy — MJ handles that himself only
  after migration is verified complete.
- Real content over lorem ipsum: pull actual copy from mjswrites.com.
