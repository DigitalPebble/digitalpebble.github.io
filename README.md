# digital-pebble

Source for the [digitalpebble.com](https://digitalpebble.com) website. Built with [Jekyll](https://jekyllrb.com/).

## Prerequisites

- Ruby (with Bundler)

Install dependencies:

```bash
bundle install
```

## Build

```bash
bundle exec jekyll build
```

Output is written to `_site/`.

## Local development

Serve the site locally with live reload:

```bash
bundle exec jekyll serve --config _config.yml,_config-dev.yml
```

The site is then available at http://localhost:4000.
