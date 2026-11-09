> Saving the world one commit at a time (with questionable commit messages).

Personal website built with Jekyll and [Plainwhite](https://github.com/samarsault/plainwhite-jekyll).

## Local preview

```sh
BUNDLE_PATH=vendor/bundle bundle install
BUNDLE_PATH=vendor/bundle bundle exec jekyll serve
```

Open `http://localhost:4000/clovisphere/`.

The homepage and bio live in `index.md`. Profile details and social links live in
`_config.yml`; the profile picture is `assets/profile.jpg`.

## GitHub Pages

For this repository (`clovisphere/clovisphere`), GitHub Pages uses **GitHub Actions**
as its publishing source. `.github/workflows/pages.yml` builds and deploys the site
on every push to `main`. The site is served at
`https://clovisphere.github.io/clovisphere/`.

For a root-level site at `https://clovisphere.github.io/`, use a repository named
`clovisphere.github.io` and change `baseurl` in `_config.yml` to `""`.

## Adding a blog later

Add Markdown posts under `_posts/` named `YYYY-MM-DD-title.md`, with `layout: post`
and a title in their front matter. To show the post list, add a `blog.md` page
with `layout: home`, then add a link to it from the homepage.
