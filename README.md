# 🌍 clovisphere.github.io

The personal site of Clovis Mugaruka, built in the **Swiss Signal** design: big type, hairline grids, a dark and light theme, and one accent colour. 🎨

**[Visit the site →](https://clovisphere.com/)** 🚀

## 🛠️ Built with

Plain HTML, CSS, and one small JavaScript file, hosted on GitHub Pages. No framework, package installation, or build step is needed. Fonts (Inter Tight and JetBrains Mono) load from Google Fonts.

## 💻 Run locally

From the repository root, start a static file server:

```sh
python3 -m http.server 8000
```

Then open [localhost:8000](http://localhost:8000). Refresh the browser after making changes. 🔄

## 🗂️ Around the repository

| File | Purpose |
| --- | --- |
| `index.html` | The whole page: hero, about, principles, work, and contact |
| `assets/css/style.css` | Layout, typography, themes, and responsive styles (mobile first 📱) |
| `assets/js/main.js` | Theme toggle and the rotating hero word |
| `assets/` | Favicon, logo, and the profile image used for social previews |
| `404.html` | Custom not-found page |
| `robots.txt` and `sitemap.xml` | Search engine discovery 🔍 |
| `.github/workflows/` | GitHub Pages publishing workflow |

## ✏️ Making changes

- 💬 **Hero words:** edit the `words` list in `assets/js/main.js`. The first word is also written in `index.html`, so it shows without JavaScript.
- 📦 **Projects:** each project is one row link in the Work section of `index.html`. Copy a row, then update its number, name, description, and stack.
- 🎨 **Colours:** dark is the default and its colours are the CSS variables at the top of `assets/css/style.css`; the light theme overrides them in the `data-theme="light"` block just below. The accent and the lime highlight are `--accent` and `--pop`.
- 🌗 **Theme:** the site opens in dark mode for everyone. The toggle switches to light, and the choice is saved in the browser.

## 📤 Publishing

Pushing to `main` runs the **Publish website** workflow. It copies the static files into a Pages artifact and deploys them to GitHub Pages. The workflow can also be started manually from the repository's Actions tab.

The custom domain is set in the repository's Pages settings, so the repository has no `CNAME` file. The generated `_site/` directory is ignored by Git.
