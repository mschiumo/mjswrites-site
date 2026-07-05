# Handoff: MJS Writes — Author Website Redesign

## Overview
A full redesign of **mjswrites.com**, the author site of Michael J. Schiuma (MJS) — memoirist, poet, and mental-health advocate. The site sells his memoir *(In)Sane*, three poetry collections, and a custom typewriter-poetry commission service, and hosts a blog ("The Journal"). The redesign replaces a generic GoDaddy template with a warm, literary, editorial aesthetic.

Five page types are included:
1. **Home** (`MJS Writes.dc.html`) — hero, memoir feature, poetry collection, trailer, custom-poetry feature, blog carousel, social follow, newsletter.
2. **Shop** (`Shop.dc.html`) — custom typewriter-poetry feature (paper + digital editions), "Coming Soon" poetry prints teaser.
3. **Blog** (`Blog.dc.html`) — filterable article index with a Categories sidebar.
4. **Article** (`journal/*.dc.html`) — long-form post template (3 instances).
5. **Contact** (`Contact.dc.html`) — contact form, author bio/About, NYC author photography.

## About the Design Files
The files in this bundle are **design references authored in HTML** (a lightweight streaming component format with `<x-dc>` templates + a `Component` logic class, glued together by `support.js`). They are **prototypes that demonstrate the intended look, layout, copy, and interactions — not production code to ship directly.**

The task is to **recreate these designs in the target codebase's environment** using its established patterns (e.g. React/Next, Vue/Nuxt, Astro, SvelteKit, or a headless-CMS + templating setup — a content-driven author site with a blog is a natural fit for Astro/Next + MDX or a CMS). If no environment exists yet, choose the most appropriate framework. Use the HTML purely as the visual/behavioral spec.

Notes specific to this format you can ignore when re-implementing:
- `{{ ... }}` are template bindings; `sc-for`/`sc-if` are loop/conditional directives; `style-hover`/`style-focus` are pseudo-state styles. Translate these to your framework's idioms.
- All styling is **inline** in the prototypes for streaming reasons — in production, move to your styling system (CSS Modules, Tailwind, styled-components, etc.). The **Design Tokens** section below is the source of truth.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions are all intended as shown. Recreate the UI faithfully using the codebase's libraries. Exact hex values, fonts, and measurements are documented below.

## Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| `bg/paper` | `#F6EEE3` | Primary page background (warm cream) |
| `bg/paper-deep` | `#EFE3D3` | Alternating section background |
| `surface/card` | `#FFFFFF` | Cards on light sections |
| `surface/cream` | `#FBF6EC` | Poster/note cards, floating chips |
| `ink` | `#2C2320` | Primary text, dark sections |
| `ink/footer` | `#221A17` | Footer background |
| `ink/soft` | `#6B5D53` | Secondary body text |
| `ink/soft-2` | `#4A3F38` / `#3A302B` | Long-form body text |
| `muted` | `#9C8A7C` | Meta text |
| `muted/faint` | `#B0A08F` | Fine print, counts |
| `muted/footer` | `#8A7B6D` | Footer labels |
| `accent` | `#C6633A` | Primary accent (burnt orange): links, CTAs, eyebrows |
| `accent/deep` | `#A44E2C` | Accent hover / emphasis italics |
| `accent/light` | `#E0A277` | Accent on dark backgrounds |
| `surface/dark` | `#2C2320` | Dark feature sections (Poetry, Custom Poetry) |
| `surface/dark-card` | `#372C27` | Cards on dark sections |
| `text/on-dark` | `#F6EEE3` | Primary text on dark |
| `text/on-dark-soft` | `#C9BBAD` | Secondary text on dark |

Selection: background `#C6633A`, text `#F6EEE3`.

### Typography
- **Display / headings:** `Newsreader` (serif, Google Fonts; opsz 6–72; weights 300–600; **italics used heavily** for emphasis and post titles). Headings use `font-weight:400`, `letter-spacing:-0.02em`, tight line-heights (0.98–1.1). Large headings use `clamp()` (e.g. hero `clamp(46px,6vw,82px)`).
- **UI / body:** `Instrument Sans` (weights 400/500/600). Body 15–19px, line-height ~1.6–1.75.
- **Handwritten accent:** `Caveat` (600) — eyebrows, signatures, captions. Often slightly rotated (`transform:rotate(-2deg)`). Sizes 20–34px, color `#C6633A`.
- **Typewriter mono:** `Courier Prime` (400/700) — "typed on a real typewriter" tags, Shop poster footer mark.
- **Eyebrows/labels:** Instrument Sans, 11.5–13px, `font-weight:600`, `letter-spacing:0.1–0.14em`, `text-transform:uppercase`, color `#C6633A` (or `#E0A277` on dark).

### Spacing / Radius / Shadow
- Section padding: `clamp(56px,8vw,104px)` vertical, `clamp(40px,6vw,96px)` horizontal.
- Content max-widths: 1180–1240px; prose column ~660–680px.
- Radius: pills/buttons `100px`; cards `10–16px`; images `8–10px`.
- Shadows: card `0 12px 34px rgba(44,35,32,0.12)`; hover `0 20px 48px rgba(44,35,32,0.2)`; elevated image `0 26px 60px rgba(44,35,32,0.24)`; CTA glow `0 6px 20px rgba(164,78,44,0.3)`.
- Buttons: pill, `padding:15px 30px` (primary), `font-weight:600`. Primary = ink `#2C2320` or accent `#C6633A`; hover swaps to the other.

## Global Chrome (all pages)
- **Announcement bar:** ink `#2C2320` bg, cream text, centered, links to the (In)Sane Amazon page. Copy: `✦  (In)Sane — my memoir on bipolar, madness & recovery is out now  Read it →` ((In)Sane in Newsreader italic).
- **Sticky nav:** translucent paper `rgba(246,238,227,0.82)` + `backdrop-filter:blur(12px)`, bottom hairline. Left = **wordmark**; right = Home / Shop / Blog / Contact + a pill "Get in touch" CTA (accent). Active link is accent `#C6633A` weight 600.
- **Wordmark (logotype):** two spans — `MJS` in Newsreader weight 600, `letter-spacing:0.14em`, ink; then `Writes` in Newsreader **italic** 400, accent `#C6633A`. In the footer, on dark: `MJS` cream + `Writes` italic `#E0A277`.
- **Footer:** ink `#221A17` bg, cream text. Wordmark + tagline ("Author, poet & mental-health advocate — writing on bipolar and recovery, plus travel, technology, politics, and poetry."), Explore + Books link columns, copyright + legal row.

## Screens / Views

### 1. Home (`MJS Writes.dc.html`)
- **Hero** — 2-col grid (`1.05fr 0.95fr`), min-height `min(88vh,760px)`. Left: Caveat "hey there," → H1 `I'm Michael — a writer at heart.` ("a writer" italic accent) → intro paragraph → two CTAs ("Read my story" ink pill → `#memoir`; "Explore the poetry →" accent underline → `#poetry`). Right: full-bleed `assets/poet.jpg` with a left-edge cream gradient fade and a floating cream caption chip. Entrance animation `floatUp 0.9s`.
- **Theme strip** — `#EFE3D3` band, single row (`flex-wrap:nowrap; overflow:hidden`), Newsreader italic items separated by `✦`: mental health · bipolar & recovery · poetry & love · travel · technology · politics.
- **Memoir feature** (`#memoir`) — 2-col (`0.85fr 1.15fr`). Left: `assets/insane.jpg`, radius 6px, big shadow, "Out now" accent pill badge (top-left, offset). Right: eyebrow "The Memoir" → H2 "(In)Sane" → italic subtitle "Memoirs of a Manic Millennial" → two body paragraphs → "Buy on Amazon →" accent pill + Caveat aside.
- **Poetry collection** (`#poetry`) — **dark section** `#2C2320`. Centered eyebrow/H2 "Words to love by" + intro. 3-col grid of book cards (`surface/dark-card`): square cover image, italic title, blurb, "Read it →" accent link. Middle card highlighted with accent ring + "Newest" badge. Covers: `assets/words.jpg`, `assets/poet.jpg`, `assets/newyork_scene.jpg`.
- **Trailer** — centered; eyebrow "Watch" → H2 "The official trailer" → 16:9 YouTube embed (`iio3IAiuVPg`), radius 14px, big shadow. (Toggle via `showTrailer` prop, default true.)
- **Custom poetry feature** — 2-col: left `assets/tw-picture.jpg` with a "typed on a real typewriter" Courier-mono tag chip; right eyebrow "Featured — From the Shop" → "A poem, typed just for you" → copy → bullet list → "Order on Etsy →". Below: a 4-image gallery of typed poems (`tw-tobeloved`, `tw-fragment`, `tw-tryasthey`, `tw-machine`), 4:5, hover-zoom, linking to Etsy.
- **Blog carousel** — compact, horizontally scrollable. Header row: H2 "The latest from my blog" + "View all →" + two round arrow buttons (`←`/`→`, hover fills ink). Track is `overflow-x:auto` with `scroll-snap-type:x mandatory` and hidden scrollbar (`[data-carousel]::-webkit-scrollbar{display:none}` + `scrollbar-width:none`). Cards fixed width `clamp(230px,26vw,290px)`, 16:9 image, tag eyebrow, italic title, `date · read`. **First card carries a "Latest" accent badge** (top-left of image), driven by `latest:true` on that post.
- **Follow** — `#EFE3D3`; Caveat "let's keep in touch" → H2 "Follow along" → wrapping row of pill chips, each with a **brand logo** (see Assets) + label; hover → accent border/text.
- **Newsletter** — accent `#C6633A` bg, cream text, centered. H2 "Get new poems & writing in your inbox" + email input + ink "Subscribe" button (→ "Thank you ♥" on submit).

### 2. Shop (`Shop.dc.html`)
Order: header → **Custom Poetry** (dark) → **Coming Soon** → footer. (Books intentionally omitted — books live on Home.)
- **Header** — centered; Caveat "take a piece home" → H1 "The Shop" (Shop italic accent) → subtitle "One-of-a-kind poems typed just for you, digital editions, and — coming soon — poetry prints for your wall."
- **Custom Poetry** (dark `#2C2320`) — three parts:
  1. 2-col: `assets/tw-picture.jpg` + accent tag; right "Made to order" → "Custom poetry, typed just for you" → copy → "Order on Etsy →" (accent-light button).
  2. 4-image typed-poem gallery.
  3. **Paper vs Digital** row (top hairline): left = the **"Between Two" digital poem, recreated as a pure-HTML poster** (cream card, `rotate(-1.4deg)`, big shadow, "Digital edition" badge top-right); Caveat "a poem for two" → italic H4 "Between Two" → `❦` divider → the poem (Newsreader 13.5px centered, 11 lines) → Courier-mono "poetry by mjs" mark. Right: "Paper, or pixels" → "Prefer it digital?" → copy → 3-bullet list → cream "Order a digital poem →" button.
     - **Poem text (verbatim):** "I find something so captivating in your eyes / Or, maybe, it has found me / So, I'll linger here for a few seconds more / As the world bustles along, as it always has / And revel in the joy of a new beginning / Content to be still as I uncover more of you / I'll chance one last glance / As you drift silently away / Setting my gaze on the dwindling twilight / Grateful for this moment / Shared between two"
- **Coming Soon** — `#EFE3D3`, centered. Accent "Coming soon" pill → H2 "Poetry prints, coming to Etsy" (prints italic accent) → copy → email + "Notify me" button (→ "You're on the list ♥").

### 3. Blog index (`Blog.dc.html`)
- **Header** — Caveat "words, essays & poems" → H1 "The Journal" → subtitle.
- **Body** — 2-col grid `1fr 236px`, `align-items:start`:
  - **Article list** (left): each post is a full-card link, grid `210px 1fr`, top hairline divider. Left = 4:3 image (radius 10, hover-zoom). Right (v-centered): meta row `date | CATEGORY` (category = accent uppercase eyebrow), italic title `clamp(24px,2.8vw,30px)`, excerpt, "Continue reading →".
  - **Categories sidebar** (right, `position:sticky; top:96px`): H2 "Categories" + hairline; then a vertical list of category buttons. Each button: name (Newsreader 18px) + post count (right-aligned faint). **Active** category = accent color, weight 600, a 2px accent left-bar with 12px left-padding. Hover → accent.
  - **Empty state:** when a category has 0 posts, the list area shows a dashed-border card: Caveat "nothing here yet" + "No posts in **{category}** just yet — check back soon."
- **Categories (taxonomy, from the live site):** All Posts, Mental Health, Poetry, Opinion, Travel, Politics, Tech, Crypto. Only the first three currently have posts.
- **Newsletter + footer** as global.

### 4. Article template (`journal/the-strange-grace-of-recovery.dc.html`, `journal/why-i-still-write-on-a-typewriter.dc.html`, `journal/to-be-loved-by-a-poet.dc.html`)
- **Header** — centered, max 760px: "← The Journal" back link → category eyebrow → H1 title → Newsreader-italic subtitle → byline row `Michael J. Schiuma • {date} • {read} read` (accent dot separators).
- **Hero image** — max 1080px, 16:9, radius 14, big shadow.
- **Body** — max 660px, **Newsreader 20px**, line-height 1.78. First paragraph uses a floated accent **drop cap** (74px). One `blockquote` pull-quote (3px accent left border, italic 25px, accent-deep). Closes with a Caveat "— Michael" signature. The poetry post instead centers the poem (Newsreader, no drop cap).
- **"Keep reading"** — `#EFE3D3` band with 2 related-post cards.

### 5. Contact (`Contact.dc.html`)
- **Hero/form** — 2-col (`0.9fr 1.1fr`), min-height `min(84vh,720px)`. Left (`#EFE3D3`): Caveat "say hello" → H1 "Let's talk." → copy → **Email** `michaelschiuma@gmail.com` (accent underline), **Phone** `973-647-4153`, and a "Find me" row of round social-logo buttons. Right: the form — Name + Email (2-col), a "What's this about?" select, Message textarea, "Send message →" accent button. On submit the form is replaced by a Caveat "thank you ♥" success block. Inputs: white bg, 1px `rgba(44,35,32,0.16)` border, radius 10, focus border accent.
- **About** — 2-col (`0.82fr 1.18fr`): left `assets/author-portrait.jpg` (radius 14, shadow) with a floating Caveat "from new york, with love" chip; right Caveat "a little about me" → H2 "Hi, I'm Michael" → 3 bio paragraphs (Newsreader 18px). Bio content is his real About copy (author/poet/public speaker/mental-health advocate from Sparta, NJ; wrote *(In)Sane* after a bipolar psychosis episode; keeps a blog "The Manic Millennial"; poetry releases *from new york, with love* 2023, *words to love by* 2024, *to be loved by a poet* 2024).
- **Skyline band** — full-bleed `assets/author-skyline.jpg` (`height clamp(300px,44vw,560px)`, object-fit cover) with an overlaid Caveat caption "where the words come from" + italic subline.

## Interactions & Behavior
- **Nav:** sticky; active route highlighted accent. "Get in touch" → Contact.
- **Blog category filter:** client state `category` (default "All Posts"). Clicking a sidebar button sets it; the list re-renders to posts whose `category` matches (or all). Counts are derived per category. Empty categories render the dashed empty-state.
- **Blog carousel:** arrow buttons call `scrollBy({left: ±min(320, 0.9×clientWidth), behavior:'smooth'})` on the track; native scroll + snap also work; scrollbar hidden.
- **Newsletter / Notify / Contact forms:** `preventDefault`, set a local "submitted" boolean, swap the button label / form to a success message. **No real backend is wired** — connect these to the target app's email/CRM (e.g. ConvertKit/Mailchimp, an Etsy waitlist, and a contact endpoint).
- **Hover states:** links → accent; buttons → swap ink/accent; cards → deepen shadow; images → subtle `scale(1.04–1.05)` over `0.5–0.6s ease`.
- **Entrance:** `floatUp` (24px rise + fade, ~0.8–0.9s) on heroes/headers.
- **Responsive:** all multi-col sections use `grid`/`flex` with `clamp()` sizing and should collapse to single-column on narrow viewports (add the breakpoints in your framework — the prototypes are desktop-first). The theme strip must stay a single row (clip overflow). External links (Amazon, Etsy, Medium, socials) open in a new tab.

## State Management
- Home: `showTrailer` (prop, bool), newsletter `subscribed` (bool) + `email`, carousel scroll ref.
- Shop: `notified` (bool) for the Coming Soon form.
- Blog: `category` (string) for filtering, `subscribed` (bool).
- Contact: `sent` (bool) to toggle the success view.
- Posts are static arrays in the prototypes — in production these should come from a **CMS or MDX/markdown content collection** (fields: `title`, `category`, `date`, `readTime`, `excerpt`, `heroImage`, `slug`, `latest?`). The "Latest" badge is a derived/flagged field.

## Assets
All in `assets/` (copied into this bundle). Provided by the client; treat as final:
- **Book covers / product photography** (warm autumn flat-lays): `poet.jpg` (to be loved by a poet), `words.jpg` (words to love by), `insane.jpg` ((In)Sane memoir), `newyork_scene.jpg` (*from new york, with love* — this cover was **composited** into the same flat-lay scene to match the set).
- **Custom-poetry photography:** `tw-picture.jpg` (poem in a teal typewriter), `tw-machine.jpg` (Smith-Corona + roses), `tw-tobeloved.jpg`, `tw-fragment.jpg`, `tw-tryasthey.jpg`, `tw-breaths.jpg` (typed poems).
- **Author photography (NYC skyline):** `author-portrait.jpg`, `author-skyline.jpg`, `author-bench.jpg`.
- **Social brand logos:** loaded at runtime from the Simple Icons CDN, monochrome ink, e.g. `https://cdn.simpleicons.org/instagram/2C2320` (instagram, tiktok, pinterest, medium, goodreads, etsy, x, buymeacoffee). **Amazon** uses a favicon fallback (`https://www.google.com/s2/favicons?domain=amazon.com&sz=64`) because Simple Icons dropped Amazon for trademark reasons. In production, bundle SVG icons locally (e.g. `simple-icons` npm package) rather than hot-linking the CDN.
- **Fonts:** Google Fonts — Newsreader, Instrument Sans, Caveat, Courier Prime. Self-host in production.
- The **"Between Two" digital poem** on Shop is **not an image** — it's recreated as HTML/CSS (see Shop §3) so it stays crisp and editable.

### Real content still needed from the author
- Full bodies + hero photos for real blog posts (the live site has e.g. *Leaving Something Behind* [Travel], *the beautiful game* [Poetry]). The 3 included article bodies for Mental Health/Opinion are **starter drafts written in his voice** and should be replaced with his real essays; the *to be loved by a poet* post uses his real poem.
- Real form endpoints, real Etsy prints listing when live.

## Files (in this bundle)
- `MJS Writes.dc.html` — Home
- `Shop.dc.html` — Shop
- `Blog.dc.html` — Blog index (+ Categories filter)
- `Contact.dc.html` — Contact
- `journal/the-strange-grace-of-recovery.dc.html` — article (Mental Health)
- `journal/why-i-still-write-on-a-typewriter.dc.html` — article (Opinion)
- `journal/to-be-loved-by-a-poet.dc.html` — article (Poetry, real poem)
- `assets/` — all imagery
- `support.js` — the prototype runtime (reference only; **do not port** — it's specific to this HTML prototype format)

To preview the prototypes as-is, serve the folder over HTTP (e.g. `npx serve`) and open `MJS Writes.dc.html`.
