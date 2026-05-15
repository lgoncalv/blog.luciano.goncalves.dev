# blog.luciano.goncalves.dev

Source code for my personal blog at [blog.luciano.goncalves.dev](https://blog.luciano.goncalves.dev).

## Stack

- **[Astro](https://astro.build/)** — static site generator
- **GitHub Actions** — builds and deploys on every push to `main`
- **GitHub Pages** — hosting, served via custom domain
- **[Umami](https://umami.is/)** — privacy-focused analytics

## Structure

```
site/                  # Astro project
├── src/
│   ├── content/
│   │   ├── posts/     # Published blog posts (.md)
│   │   └── drafts/    # Unpublished drafts (not built)
│   ├── layouts/       # BaseLayout and PostLayout
│   └── pages/         # index, /post/[slug], 404
└── public/            # Static assets (images, CSS, favicon)
```

## Writing a post

1. Create `site/src/content/posts/<slug>.md` with the required frontmatter:
   ```md
   ---
   title: Your Post Title
   publishedOn: YYYY-MM-DD
   ---
   ```
2. Push to `main` — GitHub Actions builds and deploys automatically.

To draft a post without publishing it, place the file in `src/content/drafts/` instead.

## Local development

```bash
cd site
npm install
npm run dev      # http://localhost:4321
npm run build    # production build → dist/
npm run preview  # preview production build
```
