---
layout: post
title: "Your landing page and your app should not be the same site"
date: 2026-04-28 09:00:00 +0530
author: Abhinav Saxena
tags:
  - Jekyll
  - Tailwind
  - Indie
summary: "Bundling marketing into your application is a quiet footgun. A separate static landing site deploys faster, ranks better, and stops scaling worries from leaking into your homepage. Cookie is the template I keep reaching for."
---

There is a tempting move when you start a new product. The app is in Rails or Next or whatever you reach for. The marketing page is one route. About, pricing, terms, privacy, blog, all served by the same process. One repo, one deploy, one mental model.

I have done this on enough projects to think it is a mistake.

## The problems are quiet

They do not show up in week one. They show up later, all at the same time.

**Your homepage is as slow as your slowest endpoint.** When the database is under load or a worker is leaking memory, your marketing page slows down too. The first impression a visitor gets is your worst-day performance. Static HTML on a CDN cannot have a bad day in the same way.

**Marketing edits ship behind code review.** Marketing wants to change the headline. Now it is a PR, a test run, a deploy, a cache bust. On a static site it is one commit and 40 seconds. The friction is not just annoying, it changes what gets shipped. Things that should be experiments become scheduled work.

**SEO and app routing fight each other.** Your blog wants /blog/some-post. Your app might want /blog as a feature. Pricing wants /pricing as a stable URL forever. App routing wants the freedom to refactor. They are different concerns and they should be different services.

**The marketing site never needs the application's runtime.** It does not need a database. It does not need a job queue. It does not need authentication. Why is it shipping with all of them?

## What a separate landing site looks like

A static site generator, a CSS framework, a host that serves files from a CDN. That is it. No build pipeline beyond markdown and templates. No runtime to monitor. Deploy on every push to main, ship to a CDN, done.

This is what Cookie is. Jekyll for the generator, Tailwind for the CSS, a structure that gets you from fork to deployed in an afternoon.

What ships with it:

- A landing page that does not look like a Bootstrap demo from 2014
- About, terms of service, privacy policy as starter pages
- An integrated blog with proper Markdown handling
- SEO tags, RSS feed, sitemap out of the box
- Mobile responsive without you thinking about it
- One-click deploy to Netlify, easy to point at Vercel or Cloudflare Pages

It is not a CMS. There is no admin panel. You edit Markdown files, you commit, the site rebuilds. That is the entire model.

## Who this is for

If you are an indie founder or small team about to ship a new product, separate the marketing site on day one. The cost is fifteen minutes of repo setup. The savings show up over the next two years.

If you have an existing app with marketing bundled in, the migration is usually a few days. Move /pricing, /about, /, /blog out to a static site behind the same domain. Point the app at /app or a subdomain. The hardest part is usually the blog redirects.

## Used by my own products

The receipts: Cookie powers the marketing sites for [APIC Blocks](https://www.apicblocks.com), [APIC Agent](https://www.apicagent.com), [Annexr](https://www.annexr.com), [Soopr](https://www.soopr.co), and [Chhoti Si Kahani](https://www.chhotisikahani.com). I started one of those in 2021 and never had a reason to switch off.

When the same template survives five products and four years without rewriting, that is usually the signal that the underlying decision was right, even if the template itself keeps getting refreshed.

Fork it, deploy it, write your headline: [github.com/abhinavs/cookie](https://github.com/abhinavs/cookie).
