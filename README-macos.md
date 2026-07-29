# macOS local development

Jekyll site. Use Homebrew (not Nix).

## One-time setup

```bash
brew install ruby@3.3 zlib node

export PATH="/opt/homebrew/opt/ruby@3.3/bin:/opt/homebrew/lib/ruby/gems/3.3.0/bin:$PATH"
export LDFLAGS="-L/opt/homebrew/opt/zlib/lib"
export CPPFLAGS="-I/opt/homebrew/opt/zlib/include"

gem install bundler -v 2.5.22 --no-document
bundle config set --local path 'vendor/bundle'
bundle install
npm install
npm run uglify
```

`ruby@3.3` is keg-only — add the `PATH` export to `~/.zshrc` so new shells pick it up. System Ruby (2.6) is too old for this project.

## Run

```bash
export PATH="/opt/homebrew/opt/ruby@3.3/bin:/opt/homebrew/lib/ruby/gems/3.3.0/bin:$PATH"
bundle exec jekyll serve --watch --force_polling --future
```

Then open http://localhost:4000.

`jekyll serve` uses `JEKYLL_ENV=development` by default, so asset URLs are root-relative
(`/assets/...`) and load from localhost. A production `jekyll build` still uses
`https://godsped.com` for absolute URLs (canonical, OG, etc.).

## Build only

```bash
# Local preview of static output (relative asset URLs):
JEKYLL_ENV=development bundle exec jekyll build

# Production-style build (absolute https://godsped.com URLs):
bundle exec jekyll build
```

## Notes

| Need | Source |
|------|--------|
| Ruby + Bundler + gems | `ruby@3.3`, `bundle install` (from `Gemfile`) |
| zlib | `brew install zlib` (native gem builds) |
| Node | `brew install node` — `npm i` / `npm run uglify` for `assets/js/main.min.js` |

Re-run `npm run uglify` after editing JS under `assets/js/`. Gems install under `vendor/bundle` (gitignored).
