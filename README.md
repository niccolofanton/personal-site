<div align="center">

# niccolofanton.dev

Personal portfolio site with an interactive 3D hero, built on Next.js and React Three Fiber.

[![Live site](https://img.shields.io/website?url=https%3A%2F%2Fniccolofanton.dev&label=live%20site)](https://niccolofanton.dev/)
[![GitHub stars](https://img.shields.io/github/stars/niccolofanton/personal-site?style=flat)](https://github.com/niccolofanton/personal-site/stargazers)
[![License: Tailwind UI](https://img.shields.io/badge/license-Tailwind%20UI-2563eb)](./LICENSE.md)

**[Visit the live site →](https://niccolofanton.dev/)**

</div>

---

## About

This is the source code for [niccolofanton.dev](https://niccolofanton.dev/), Niccolò Fanton's personal website. It is a statically generated Next.js site that pairs a classic portfolio layout with an interactive WebGL hero rendered through React Three Fiber and post-processing effects.

The project started from the Tailwind UI "Spotlight" template and was extended with a custom 3D scene, animated text and smooth scrolling.

## Features

- Interactive 3D hero scene built with React Three Fiber, drei and `@react-three/postprocessing` (N8AO ambient occlusion and an ASCII render effect), auto-rotating via `OrbitControls`.
- Articles and projects pages with content authored directly in TSX.
- Page transitions and motion via Framer Motion and GSAP, plus Lenis smooth scrolling.
- Light/dark theming with `next-themes` and the Geist font.
- SEO setup (`next-seo`, structured data, `sitemap.xml` and `robots.txt`).
- Configured for deployment to Cloudflare (`wrangler.toml`).

## Tech stack

- **Framework:** Next.js 14 (Pages Router) + TypeScript
- **Styling:** Tailwind CSS + `@tailwindcss/typography`
- **3D / graphics:** three.js, React Three Fiber, drei, postprocessing
- **Animation:** Framer Motion, GSAP, Lenis

> MDX tooling (`@next/mdx`, `@mdx-js/react`) is wired up in the build config, but no MDX content ships in the repo yet — the articles loader currently returns an empty list.

## Getting started

Requires Node.js and [Yarn](https://yarnpkg.com/) (the repo ships a `yarn.lock`).

```bash
# install dependencies
yarn install

# copy environment variables and adjust as needed
cp .env.example .env.local

# start the dev server at http://localhost:3000
yarn dev
```

Build and serve a production bundle:

```bash
yarn build
yarn start
```

Lint the project:

```bash
yarn lint
```

## Credits

- Base layout adapted from the [Tailwind UI](https://tailwindui.com/) **Spotlight** template.
- 3D rendering powered by [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) and the [pmndrs](https://github.com/pmndrs) ecosystem.

## License

This project is based on a Tailwind UI template and is distributed under the [Tailwind UI License](./LICENSE.md). Review those terms before reusing the code or design assets.
</content>
</invoke>
