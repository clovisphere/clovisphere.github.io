# clovisphere.github.io

My little corner of the web. A personal site for Clovis Mugaruka (Clov), an independent software engineer based in Nairobi, Kenya.

**[Visit the site →](https://clovisphere.github.io/)**

## Built with

Plain HTML and CSS, hosted on GitHub Pages. No framework, package installation, or build step is needed to work on the site.

## Run locally

From the repository root, start a static file server:

```sh
python3 -m http.server 8000
```

Then open [localhost:8000](http://localhost:8000). Refresh the browser after making changes.

## Around the repository

| File | Purpose |
| --- | --- |
| `index.html` | Introduction, selected work, side projects, and contact links |
| `assets/css/style.css` | Layout, typography, and responsive styles |
| `assets/` | Profile photo, logo, and favicon |
| `404.html` | Custom not-found page |
| `robots.txt` and `sitemap.xml` | Search engine discovery |
| `.github/workflows/` | GitHub Pages publishing workflow |

## Publishing

Pushing to `main` runs the **Publish website** workflow. It copies the static files into a Pages artifact and deploys them to GitHub Pages. The workflow can also be started manually from the repository’s Actions tab.

The generated `_site/` directory is ignored by Git.
