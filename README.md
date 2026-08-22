# La-Resume 📄🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/shubhamku044/la-resume/issues)
[![GitHub Stars](https://img.shields.io/github/stars/shubhamku044/la-resume.svg)](https://github.com/shubhamku044/la-resume/stargazers)

A modern, open-source resume builder with ATS optimization and LaTeX export capabilities. Create professional resumes effortlessly, completely free!

👉 [Live Link](https://la-resume.com/) | [Demo Video](https://youtu.be/IxrN5y3VP0A?si=hhgGYL7jfN9GA8fx)

![La-Resume Interface](https://la-resume.com/og-image.png)
![La-Resume Interface](https://ik.imagekit.io/laresume/public/la-resume-mockup.webp?updatedAt=1741200085904)

## Features ✨

- 🎯 ATS-Optimized Templates
- 📤 One-click PDF/LaTeX Export
- 🆓 100% Free and Open Source
- 🔒 No Signups Required
- 🌐 Progressive Web App (PWA) Support

## Color tokens 🎨

**Never use raw hex values or default Tailwind palette classes (e.g. `bg-emerald-600`, `text-blue-500`, `#059669`) for UI colors — use the semantic tokens defined in [`src/app/globals.css`](src/app/globals.css) only.**

The token system is the single source of truth ("Emerald Professional" scheme): `primary`, `primary-hover`, `primary-soft`, `primary-ink`, `accent` (soft hover tint), `accent-strong` (teal), `surface`, `surface-raised`, `content`, `content-muted`, `border-default`, `success`, `warning`, `destructive`/`danger`. Every token has a dark-mode value, so `bg-primary` etc. re-theme automatically — a component never needs a `dark:` color variant for scheme colors.

Why semantic names over palette names: `bg-primary` can be re-themed site-wide by changing one line in `globals.css`; a palette class in 40 files cannot. The full audit and mapping record lives in [`docs/color-inventory.md`](docs/color-inventory.md).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=shubhamku044/la-resume&type=Date)](https://www.star-history.com/#shubhamku044/la-resume&Date)

## Contributors ✨

<a href="https://github.com/shubhamku044/la-resume/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=shubhamku044/la-resume" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
