# Contributing to Moonwalk

Bug reports and pull requests are welcome.

## Development setup

1. Fork and clone the repo
2. Make sure you have Ruby installed (see `.ruby-version` for the recommended version)
3. Run `bin/bootstrap` to install dependencies
4. Run `bin/start` to launch the dev server at `http://127.0.0.1:4000`

You can also use `make serve` and `make build` if you prefer.

## Making changes

- Keep the theme minimal - avoid adding heavy dependencies or complex JavaScript
- Test both light and dark mode for any visual changes
- Make sure the site builds cleanly with `bin/build`
- If adding a new config option, document it in `_config.yml` with a comment

## Pull requests

- Keep PRs focused on a single change
- Describe what the change does and why
- Include a screenshot if the change is visual
