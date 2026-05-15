---
title: "Now Static Site Generation (SSG)"
publishedOn: 2026-05-15
---

Ok, I ditched the old Angular CSR website for this new static site generated website. It's so easy now with AI that it took me maybe a couple of hours to get it all live with GitHub Copilot. The prompt was something like:

>let's convert this Angular CSR into an SSG website. We should read the posts from a `posts` folder in the repo instead of our Firestore database. We should build the pages on every merge into `main` and deploy to GitHub Pages instead of Firebase. And let's replace Google Analytics with [Umami.is](https://umami.is)

From there it asked me a couple of questions about what to use and we were done.

There were a couple of follow-ups with style fixes and a problem with the base URL (when using a GitHub Pages URL or a custom domain), but it pretty much worked out of the box. Check the README file generated below.

## Stack

- **[Astro](https://astro.build/)** — static site generator
- **GitHub Actions** — builds and deploys on every push to `master`
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
2. Push to `master` — GitHub Actions builds and deploys automatically.

To draft a post without publishing it, place the file in `src/content/drafts/` instead.

## Local development

```bash
cd site
npm install
npm run dev      # http://localhost:4321
npm run build    # production build → dist/
npm run preview  # preview production build
```
