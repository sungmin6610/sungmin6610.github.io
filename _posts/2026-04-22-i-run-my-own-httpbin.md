---
layout: post
title: "I run my own httpbin"
date: 2026-04-22 09:00:00 +0530
author: Abhinav Saxena
tags:
  - HTTP
  - Elixir
  - Tools
summary: "httpbin is a load-bearing piece of every developer's mental model. When the public one goes down, my CI breaks too. So I rebuilt it in Elixir and run it myself."
---

httpbin.org is one of those quiet pieces of internet plumbing that everyone leans on. CI tests, client library examples, half the curl tutorials on Stack Overflow. It is also a single hostname run as a side project, and when it has a bad day, my tests have a bad day.

That bothered me enough to rebuild it. [HTTPlex](https://httplex.com) is a small Elixir/Phoenix service that does the same thing httpbin does, runs on a box I control, and never makes my CI flaky because someone else's deploy went sideways. There is also a hosted version at [httplex.com](https://httplex.com) you can point at if you do not want to self-host.

## What it does

The same things httpbin does, mostly.

- Echo what you sent: GET /get, POST /post, /headers, /ip, /user-agent
- Return any status code: /status/418
- Test redirects, both absolute and relative, single hop or chained
- Test all the auth flavors: basic, bearer, digest, hidden basic
- Return a response in any format: JSON, XML, HTML, an actual image
- Stream bytes, drip data over time, delay a response by N seconds
- Set and read cookies
- Return data in any encoding: gzip, brotli, deflate
- Test caching: ETag, Cache-Control, max-age

If you have used httpbin, you already know the API. That is the point. There is no learning curve, just a different hostname.

## Why Elixir

Two reasons.

The first is honest: I wanted to write more Elixir, and a service like this is small enough to finish in a weekend and rich enough to touch most of Phoenix. Pattern matching on request methods, returning streams from a controller, OTP supervision under load. It is a good project to learn on.

The second is practical: BEAM handles slow clients and long-lived connections better than almost anything else. /drip and /stream-bytes are useful precisely because they keep a connection open. On a runtime where every connection is a process, that is just normal.

## Why bother running it yourself

Three reasons that mostly collapse into one.

**Your CI shouldn't depend on a third-party hostname.** Every shared service has bad days. Yours should not be coupled to theirs.

**Self-hosted means you can extend it.** Need to test how your client handles a server that returns 200 OK with a Content-Length lie? Add an endpoint. The whole controller is one file you can read in five minutes.

**It is a free education.** If you have never read a real Phoenix controller, this is a cheap way to. The whole repo is a tour of the framework's idioms with no business logic in the way.

## Running it

```
git clone https://github.com/abhinavs/httplex
cd httplex
mix setup
mix phx.server
```

Now hit localhost:4000. Or deploy it. Phoenix releases are one command and the artifact is a self-contained tarball. Fly.io and Render both have one-click templates.

Or just hit [httplex.com](https://httplex.com) and start poking endpoints. Source: [github.com/abhinavs/httplex](https://github.com/abhinavs/httplex).

A small tool, a fun rewrite, and a quiet reduction in CI flakiness. Worth a weekend.
