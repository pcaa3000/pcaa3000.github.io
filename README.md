# pcaa.dev — Platform Engineer & AI/Automation Portfolio

Personal portfolio site for **Pablo Cesar Aquino Ajra**, a Platform Engineer focused on infrastructure, automation and AI integrations.

> Static, fast, single-page portfolio designed to load quickly and work on mobile first.

## Quick start

Open the site in any modern browser:

```bash
# Option 1: open directly
open index.html

# Option 2: serve locally
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## What's inside

| Section | Purpose |
|---------|---------|
| Hero | Name, title, key tech badges and primary CTAs |
| About | Career philosophy and impact cards |
| Stack | Filterable grid of platform, dev, AI and automation tools |
| Projects | Selected work with repo and live links |
| Experience | Timeline and certifications |
| Resume | PDF download |
| Contact | Email, LinkedIn, GitHub and a mailto form |

## Tech stack

| Layer | Tech |
|-------|------|
| Markup | HTML5 |
| Styling | Tailwind CSS (CDN) + custom `css/style.css` |
| Icons | Lucide (CDN) |
| Logic | Vanilla JavaScript (`js/script.js`) |
| Fonts | Inter, Space Grotesk (Google Fonts) |

## Features

- Responsive, dark-themed single-page layout
- Mobile navigation with toggle
- Scroll progress indicator
- Category filters for stack and project cards
- Reveal-on-scroll animations
- Contact form that opens the user's email client
- Print-friendly CV download

## Project structure

```
portafolio/
├── index.html          # Main page
├── css/
│   └── style.css       # Custom styles and design tokens
├── js/
│   └── script.js       # Mobile menu, filters, scroll progress, contact form
├── assets/
│   └── CV.pdf          # Resume
├── .agents/
│   └── skills/         # Portfolio-related AI skills used to build/maintain the site
└── README.md           # This file
```

## Deployment

This is a static site. You can deploy it to any static host such as GitHub Pages, Cloudflare Pages, Vercel or Netlify. No build step is required.

## Contact

- Email: [pcaa3000@gmail.com](mailto:pcaa3000@gmail.com)
- LinkedIn: [pablo-cesar-aquino-ajra](https://www.linkedin.com/in/pablo-cesar-aquino-ajra/)
- GitHub: [pcaa3000](https://github.com/pcaa3000)
