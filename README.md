# GeniusHydra — personal site

A dark-mode personal website built with **plain HTML, CSS and JavaScript** — no framework, no build step, no dependencies. Deployed on Cloudflare Pages.

## Pages

| Path | Description |
|------|-------------|
| `/` | Link-in-bio home (avatar, copy buttons, live Discord status, social links) |
| `/about.html` | Bio |
| `/setup.html` | PC / peripherals / software |
| `/gallery.html` | Image gallery with lightbox |
| `/presence.html` | Live "where I'm active" status |
| `/404.html` | Custom 404 |

## Project structure

```text
├── index.html          ← home
├── about.html
├── setup.html
├── gallery.html
├── presence.html
├── 404.html
├── links.json          ← social links (edit this to change your links)
├── config.js           ← site config (Discord ID, usernames, analytics)
├── robots.txt
├── sitemap.xml
├── css/style.css
├── js/
│   ├── main.js         ← theme switcher, copy buttons, nav, parallax
│   ├── links.js        ← renders links from links.json
│   ├── presence.js     ← live Discord status (Lanyard)
│   └── gallery.js      ← lightbox
└── assets/
    ├── favicon.svg / favicon.ico
    ├── og-image.png    ← social share preview card
    ├── icons/          ← avatar + platform icons
    └── gallery/        ← drop your gallery images here (1.jpg, 2.jpg, …)
```

## Run locally

```sh
cd geniushydra
python -m http.server 4321
# → http://localhost:4321
```

> Use a local server (not double-clicking `index.html`) — the link list is fetched from `links.json`, which needs HTTP.

## Customize

### Social links
Edit **`links.json`**. Each entry:

```json
{
	"name": "Label",
	"subtitle": "Subtitle",
	"url": "https://…",
	"icon": "assets/icons/your-icon.png",
	"platform": "discord",   // discord | telegram | steam | github
	"accent": "#5865F2"       // hover glow colour
}
```

### Copy buttons + Discord status
Edit **`config.js`**:
- `usernames` — what the Discord/Telegram/Steam copy buttons copy.
- `discordId` — your numeric Discord user ID for the live status badge
  (Discord → Settings → Advanced → enable Developer Mode → right-click your profile → Copy User ID).
  You also need to join the [Lanyard Discord](https://discord.gg/lanyard) server so your presence is tracked.
- `goatcounter` — optional analytics code (leave `''` to disable).

### Accent colour
Five accent themes are available via the colour dots in the nav (saved in `localStorage`). Add or change themes in `css/style.css` (the `[data-accent=…]` blocks) and the matching buttons in each page's nav.

### Gallery
Drop images into `assets/gallery/` as `1.jpg`, `2.jpg`, … (or edit the `src` attributes in `gallery.html`). Tiles whose image is missing are hidden automatically.

## Deploy

Push to `main` — Cloudflare Pages serves the repo root with **no build step**. Build settings:
- **Build command:** *(empty)*
- **Build output directory:** `/`
