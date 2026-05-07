---
layout: post
title: "Making your Jekyll site agent-friendly"
date: 2026-05-06 00:30:00 +0530
author: Abhinav Saxena
tags:
  - Jekyll
  - AI
  - Plugins
toc: true
summary: "Two small Jekyll plugins ship with Moonwalk that make your site readable by LLMs and coding agents - per-page Markdown twins and llms.txt indexes - without changing how it looks for humans."
---

A growing share of your readers are not human. ChatGPT, Claude, Perplexity, agent frameworks, and the indexing crawlers behind them all want to read your site. They are also pretty bad at it. They burn tokens parsing HTML, stripping nav chrome, decoding theme toggles, and hunting for the actual prose.

Moonwalk now ships with two tiny Jekyll plugins that fix this. Browsers still see your site exactly as before. Agents get clean Markdown.

## What ships

### jekyll-markdown-output

For every post rendered at /foo, this plugin emits a sibling at /foo.md containing:

- a small YAML frontmatter block (title, date, url, summary, tags, category, author)
- the post's source Markdown with Liquid rendered

No layouts, no nav, no theme toggle scripts. Just the content.

```
_site/
  foo.html              <- as before
  foo.md                <- new: clean Markdown
```

An agent that lands on /foo can fetch /foo.md and skip HTML parsing entirely. It is the same pattern Anthropic, Stripe, and a growing set of agent-friendly sites use.

### jekyll-llms-output

This one generates two files at the root of your site:

- **/llms.txt** - a curated index of your most important pages, following the [llmstxt.org](https://llmstxt.org) spec. Think of it as a sitemap for LLMs.
- **/llms-full.txt** - the full content of all configured collections, concatenated. One fetch and an agent has your entire blog.

If you drop a YAML data file at _data/llms.yml with a title, description, and sections, the plugin uses your hand-curated structure. Otherwise it auto-generates from your posts.

## Why two plugins instead of one

They solve different problems and compose well.

The llms.txt file is a single discovery file. An agent that has never seen your site can fetch it and learn what is here. But it is one file, and it does not scale to deep linking. If a user shares a specific post URL with an agent, the agent still needs to fetch that page.

That is where Markdown siblings come in. Any post URL has a Markdown twin one extension away. Agents do not need to consult the index first.

Ship both. They are complementary.

## How to enable them

Both ship as Moonwalk runtime dependencies. If you are on Moonwalk 0.2.0 or later, you only need to add them to your config:

```yaml
plugins:
  - jekyll-markdown-output
  - jekyll-llms-output

markdown_output:
  collections: [posts]

llms_output:
  index:
    collections: [posts]
  full:
    collections: [posts]
    respect_markdown_output: true
```

Build the site. You should see something like:

```
MarkdownOutput: wrote 9 markdown file(s)
LlmsOutput: wrote /llms.txt
LlmsOutput: wrote /llms-full.txt
```

That's it.

## Customizing what shows up

### Skip a single post

Add `markdown_output: false` to a post's frontmatter and no Markdown twin is emitted for it. Useful for drafts you want indexed by Google but not picked up by agents.

### Curate llms.txt

The auto-generated index is fine. A curated one is much better. Drop this in `_data/llms.yml`:

```yaml
title: Your Site
description: >
  One paragraph about who you are and what readers
  (human or otherwise) will find here.

sections:
  - heading: Featured Writing
    links:
      - title: My best post
        url: https://example.com/best-post
        description: One line on what it covers

  - heading: About
    links:
      - title: About me
        url: https://example.com/about
        description: Background and contact
```

The plugin uses this verbatim. You decide what an agent encounters first.

### Respect Markdown twins in the bulk file

The default config sets `respect_markdown_output: true`. This tells the llms-full plugin to skip any post that has opted out via the markdown frontmatter flag. Without it, opted-out posts would still leak into the bulk file.

## What about GitHub Pages

GitHub Pages restricts plugins to a [whitelist](https://pages.github.com/versions/), and these two are not on it. Your options:

1. Build the site yourself in CI - Actions, Netlify, Cloudflare Pages, Vercel - and deploy the built site to GH Pages.
2. Skip the plugins and serve HTML only.

Cloudflare Pages, Netlify, and Vercel run them without restriction. If you are on GH Pages and want this to work, the cleanest path is a small GitHub Actions workflow that builds and deploys.

## Should you bother

If your site is mostly for humans and you do not care whether an LLM cites it well, no. Move on.

If you write things you want agents to find, recommend, and quote accurately, this is a roughly five-minute change with a non-trivial payoff. Agents are reading your site whether you help them or not. The question is whether they read source Markdown or a wrestled-down approximation of your HTML.

Both plugins are open source and small enough to read in one sitting:

- [github.com/abhinavs/jekyll-markdown-output](https://github.com/abhinavs/jekyll-markdown-output)
- [github.com/abhinavs/jekyll-llms-output](https://github.com/abhinavs/jekyll-llms-output)

They were the smallest change I could think of that meaningfully improves how the agentic web reads my own writing. Now they are part of Moonwalk too.
