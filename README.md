# pcaa.dev — Platform Engineer & AI/Automation Portfolio

Personal portfolio site for **Pablo Cesar Aquino Ajra**, a Platform Engineer focused on infrastructure, automation and AI integrations.

> Static, fast, single-page portfolio designed to load quickly and work on mobile first. Available in English and Spanish.

## Quick start

Open the site in any modern browser:

```bash
# Option 1: open directly
open index.html

# Option 2: serve locally
python3 -m http.server 8000
# or
npm run serve
# Then visit http://localhost:8000
```

## What's inside

| Section | Purpose |
|---------|---------|
| Hero | Name, title, key tech badges and primary CTAs |
| About | Career philosophy and impact cards |
| Stack | Filterable grid of platform, dev, AI and automation tools |
| Projects | Selected work in a filterable carousel with autoplay |
| Experience | Timeline and certifications |
| Resume | PDF download |
| Contact | Email, LinkedIn, GitHub and a working contact form |

## Tech stack

| Layer | Tech |
|-------|------|
| Markup | HTML5 |
| Styling | Tailwind CSS (compiled, `css/tailwind.css`) + custom `css/style.css` |
| Icons | Lucide (CDN, pinned + SRI) |
| Logic | Vanilla JavaScript (`js/script.js`) |
| Fonts | Inter, Space Grotesk (Google Fonts) |
| Forms | Web3Forms API with mailto fallback |

## Features

- Responsive, dark-themed single-page layout
- **Bilingual (EN/ES)**: header toggle swaps all copy via `data-es` attributes + an `I18N` dictionary, persisted in `localStorage`
- **Projects carousel**: scroll-snap track, arrow/dots navigation, autoplay (3s) with pause button, hover/focus pause, and `prefers-reduced-motion` support
- Category filters for stack and project cards (a `filterchange` event keeps the carousel in sync)
- Mobile navigation, scroll progress indicator, reveal-on-scroll animations
- SEO: Open Graph/Twitter cards, JSON-LD `Person`, SVG favicon
- Accessibility: skip-to-content link, ARIA labels (translated), `aria-live` form status
- Contact form via Web3Forms (honeypot anti-spam, mailto fallback)

## Project structure

```
portafolio/
├── index.html            # Main page (EN source; ES strings in data-es attrs)
├── css/
│   ├── tailwind.src.css  # Tailwind input (@tailwind directives)
│   ├── tailwind.css      # Compiled Tailwind output (generated)
│   └── style.css         # Custom styles and design tokens
├── js/
│   └── script.js         # Menu, filters, carousel, i18n, form, scroll progress
├── assets/
│   ├── favicon.svg       # Site icon
│   └── CV.pdf            # Resume
├── tailwind.config.js    # Content scan paths, fonts, brand colors
├── package.json          # npm scripts (build:css, watch:css, serve)
└── README.md             # This file
```

## Development

Tailwind is compiled ahead of time — the CDN runtime is **not** used. If you add or change Tailwind utility classes in `index.html` or `js/script.js`, rebuild the CSS:

```bash
# one-off build (uses npx if tailwindcss is not installed)
npm run build:css

# or watch while you work
npm run watch:css
```

`css/tailwind.css` is committed, so deploying needs no build step.

### Translations

The English copy lives inline; the Spanish version of each text is in a `data-es` attribute on the same element. Input placeholders use `data-es-ph`. Dynamic strings (scroll labels, ARIA, form status) live in the `I18N` object in `js/script.js`. New user-facing text needs both, or it silently stays in English.

### Contact form

Posts to `https://api.web3forms.com/submit` with the access key stored in a hidden form field (public client-side key by design). On network failure it falls back to a `mailto:` draft.

## Deployment

This is a static site. You can deploy it to any static host such as GitHub Pages, Cloudflare Pages, Vercel or Netlify. Commit `css/tailwind.css` after rebuilding and no build step is required on the host.

## Contact

- Email: [pcaa3000@gmail.com](mailto:pcaa3000@gmail.com)
- LinkedIn: [pablo-cesar-aquino-ajra](https://www.linkedin.com/in/pablo-cesar-aquino-ajra/)
- GitHub: [pcaa3000](https://github.com/pcaa3000)
