# GeniusHydra — personal link page

A dark-mode "link in bio" site built with **plain HTML, CSS and JavaScript** — no framework, no build step, no dependencies.

## Project structure

```text
geniushydra-web/
├── index.html          ← the page (content + inline SVG icon sprite)
├── css/
│   └── style.css       ← dark theme, aurora background, cards
├── js/
│   └── main.js         ← image fallbacks, year, mouse parallax
└── assets/
    ├── favicon.svg / favicon.ico
    └── icons/          ← avatar + platform icons
```

## Run it locally

Just open `index.html` in a browser, or serve it:

```sh
cd geniushydra-web

# Python 3
python -m http.server 4321

# or Node
npx serve .
```

Then visit http://localhost:4321

## Deploy

Drop the folder on any static host — GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc. No build command required.

## Editing links

All links live in `index.html` inside `<nav class="links">`. Each card looks like:

```html
<a class="link-card" style="--accent: #5865F2; --i: 0" href="YOUR_URL" target="_blank" rel="noopener noreferrer">
	<span class="link-icon img-box">
		<img src="assets/icons/your-icon.png" alt="" />
		<svg class="img-fallback" viewBox="0 0 24 24"><use href="#icon-discord" /></svg>
		<span class="platform-badge platform-discord"><svg viewBox="0 0 24 24"><use href="#icon-discord" /></svg></span>
	</span>
	<span class="link-text">
		<span class="link-name">Label</span>
		<span class="link-subtitle">Subtitle</span>
	</span>
	<svg class="arrow" ...>...</svg>
</a>
```

- `--accent` controls the hover glow colour per card.
- `--i` controls the stagger order of the entrance animation.
- The `#icon-*` symbols are defined at the bottom of `index.html` and used as fallbacks if an icon image fails to load.
