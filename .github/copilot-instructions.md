# Copilot Instructions

## Repository structure

This is a monorepo. The active site lives in `site/`. The old Angular app and Firebase Functions are archived in their original folders.

- `site/` — Astro static site (the live blog)
- `blog.luciano.goncalves.dev/` — legacy Angular 8 app (archived)
- `functions.blog.luciano.goncalves.dev/` — legacy Firebase Cloud Functions (archived)

## Commands

### Site (`site/`)
```bash
npm install
npm run dev      # dev server at http://localhost:4321
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Architecture

**Astro 6** static site deployed to **GitHub Pages** at `blog.luciano.goncalves.dev`.

- Posts are `.md` files in `src/content/posts/` — no database, no backend
- The filename (without `.md`) is the slug → URL: `/post/<filename>`
- Drafts go in `src/content/drafts/` — that folder is not in the content collection config and is never built
- GitHub Actions builds on every push to `master` touching `site/**` and deploys via `actions/deploy-pages`

### Content collection schema (`src/content.config.ts`)
```ts
{ title: string, publishedOn: Date }
```

### Pages
| Route | File |
|---|---|
| `/` | `src/pages/index.astro` — all posts, full content, sorted newest first |
| `/post/[slug]` | `src/pages/post/[slug].astro` — single post |
| `/404` | `src/pages/404.astro` |

### Layouts
- `BaseLayout.astro` — html shell, header, GA snippet, global CSS
- `PostLayout.astro` — wraps BaseLayout with post title/date header

## Key conventions

- **Adding a post**: create `src/content/posts/<slug>.md` with `title` and `publishedOn` frontmatter; push to `master`
- **Drafting**: move the `.md` file to `src/content/drafts/`; it will never be published
- **Images**: place in `public/images/`; reference as `/images/filename.ext` in markdown
- **Styles**: single flat CSS file at `public/styles/global.css` — no build step needed for styles
- **Astro 5+ render API**: use `import { render } from 'astro:content'` then `await render(post)` — **not** `post.render()`

## CI/CD

- Workflow: `.github/workflows/frontend.yml`
- Triggers on push to `master` for paths under `site/**`
- Requires GitHub Pages to be enabled in repo settings with source set to **GitHub Actions**
- No secrets needed — uses OIDC (`id-token: write` permission)
