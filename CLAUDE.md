# CLAUDE.md — mjswrites-site

## What this project is

Rebuild of mjswrites.com — the author site for Michael J. Schiuma (MJ), writer
of the memoir *(In)Sane: Memoirs of a Manic Millennial* and three poetry
collections (*words to love by*, *to be loved by a poet*, *from new york,
with love*). The current site is a GoDaddy Websites+Marketing template being
replaced with a custom static site deployed on Vercel. MJ also sells custom
typewriter-typed poetry on Etsy.

## Session handoff — decisions already made (July 2026, claude.ai chat)

1. **Design is decided.** `design/mjswrites-redesign.html` is the approved
   direction — treat it as the source of truth for visual identity:
   - Palette: ink navy #1B2233, cool paper #F6F6F2, brand slate #4E5F83,
     typewriter-ribbon red #B23A48. No warm-cream/terracotta defaults.
   - Type: Special Elite (typewriter display), EB Garamond (body serif),
     Work Sans (UI/labels).
   - Signature motifs: typed hero with blinking caret; the "(in)" parenthesis
     in ribbon red, reused as section labels like "(01)", "(the memoir)".
   - Sections: announcement bar → sticky nav with single "Get (In)Sane" CTA →
     typed hero with book cover → dark memoir spotlight → 3-card poetry
     shelf → Etsy custom-poetry commission band with typed-paper sample →
     blog + newsletter panels → consolidated footer with all socials.
   - NOTE: the poem in the commission band is PLACEHOLDER verse written by
     Claude — MJ must replace it with his own piece before launch.

2. **Stack plan:** static site (Astro preferred; Next.js acceptable),
   markdown-based blog in `content/blog/`, deployed via GitHub → Vercel
   auto-deploy. Domain stays registered at GoDaddy; DNS points to Vercel.
   MJ already has a Vercel account. Vercel Hobby terms are a gray area for
   an author-promo site — flagged to MJ; Cloudflare Pages is the fallback.

3. **Analytics plan:** Vercel Web Analytics (free on Hobby, ~50k events/mo)
   for pageviews/referrers + GA4 or Umami for outbound click tracking
   (Amazon/Etsy buy buttons, trailer plays). Vercel custom events are
   Pro-only — don't rely on them.

4. **Blog migration:** posts live at mjswrites.com/f/{slug}. CRITICAL
   FINDING: GoDaddy renders post bodies client-side — plain HTTP fetch
   returns only meta tags (title, excerpt, hero image). Full playbook in
   `MIGRATION-README.md`: try the RSS feed first, else Playwright. Many
   posts are POEMS — preserve line breaks during HTML→markdown conversion.
   Three scaffold posts with real metadata are in `content/blog/` with TODO
   markers for bodies/dates.

5. **SEO:** old URLs are indexed. Add vercel.json redirect
   `/f/:slug → /blog/:slug` (permanent).

6. **Commerce:** no cart on the new site. Buy links go out to Amazon
   (books) and Etsy (custom poetry). Newsletter form should use a free
   provider (Buttondown or Mailchimp embed) — decision pending with MJ.

## Immediate next steps (in order)

1. `git init`, create GitHub repo `mjswrites-site` (private), push.
2. Scaffold Astro project; port `design/mjswrites-redesign.html` into
   components/layouts; wire `content/blog/` as a content collection.
3. Run the blog migration per `MIGRATION-README.md`; verify poem line
   breaks; fill the three scaffold posts and add the rest.
4. Build remaining pages: /books (or per-book pages), /blog index, /contact.
5. Add vercel.json redirects, connect repo to Vercel, point GoDaddy DNS.
6. Ask MJ for: his replacement poem for the commission band, real book
   cover images, and his newsletter-provider choice.

## Working agreements

- Confirm with MJ before any deploy to the production domain.
- Don't cancel or touch anything on GoDaddy — MJ handles that himself only
  after migration is verified complete.
- Real content over lorem ipsum: pull actual copy from mjswrites.com.
