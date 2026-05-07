---
layout: post
title: "Unix wasn't built for agents"
date: 2026-04-15 09:00:00 +0530
author: Abhinav Saxena
tags:
  - AI
  - CLI
  - Unix
toc: true
summary: "Classic Unix tools quietly assume a human is watching the pipe. Agents don't watch. vrk is 26 small tools designed for what changes when no one is reading the intermediate output."
---

A few weeks ago I caught a pipeline that was about to send a 200KB document to an LLM, fail the input limit, retry three times, and bill me for the privilege. The shell didn't blink. cat printed bytes, jq parsed them, curl uploaded them. Each tool did its job. None of them knew the agent at the end of the pipe was going to blow a token budget.

That bug taught me something obvious in retrospect. Unix tools were built for humans who read the output of one stage before piping to the next. We grep, eyeball the result, then pipe to awk. Agents skip the eyeballing. They wire the whole pipeline up at once and hope.

vrk is the toolkit I started building for that gap. 26 small commands, one static binary, zero dependencies. It is not a replacement for cat or jq. It is the layer that should sit next to them when the consumer at the other end of the pipe is an LLM.

## What changes when an agent is reading the pipe

Three things, mostly.

**Silent failures stop being acceptable.** classic Unix conflates "no output" with "everything is fine." awk on a missing field returns empty. jq on a wrong path returns null. A human notices. An agent passes the empty string through and the next stage hallucinates.

vrk tools use explicit exit codes. 0 for success, 1 for an error you should stop on, 2 for a soft signal the next tool can react to. A tok check against a budget exits 2 when the input is too large, so the next stage in the pipe can branch instead of crashing.

**Token counts are first-class.** None of the standard tools care how many tokens a string is. wc -w is approximate at best, lying at worst. If the next stage costs money per token, you want the count up front and you want to gate on it.

```
cat article.md | vrk tok --check 8000 | vrk prompt --system 'Summarize'
```

The check fails loudly if the input would blow the budget. The prompt never runs. No retries, no surprise bill.

**Secrets need to leak less.** Pipelines copy data through a lot of stages. Anything you log, cache, or upload to a third-party model is a potential leak. vrk mask runs entropy and pattern checks on stdin and redacts before the data ever reaches a remote API.

## The shape of the toolkit

A few I reach for daily:

- **vrk grab** - fetch a URL and return clean Markdown. Stripping nav and chrome before the LLM sees it cuts token cost by 40 to 60 percent on most articles.
- **vrk chunk** - split a long document into token-bounded pieces with sentence-aware boundaries. The naive "split every N characters" approach truncates mid-word and the model notices.
- **vrk validate** - validate JSON output against a schema. LLMs return JSON-shaped strings, not always valid JSON. Catch it at the seam, not three stages later.
- **vrk coax** - retry with backoff. Built into the tool because every agent pipeline needs it and shell loops with sleep are how you end up rate-limited at 3 AM.
- **vrk kv** - SQLite-backed key-value store for caching. Same reason: every pipeline needs one, and standing up Redis to memoize a function call is absurd.

The rest cover the boring bits: jwt, uuid, epoch, sse parsing, schema diffing. They exist because at some point I wrote them inline in a bash script and decided that was the third time too many.

## Composability is the whole point

Each tool reads stdin and writes stdout. None of them have hidden state. They chain.

```
cat data.json \
  | vrk validate --schema input.schema.json \
  | vrk mask \
  | vrk prompt --model claude-opus-4-7 --system 'Extract entities' \
  | vrk validate --schema output.schema.json
```

That is a complete agent pipeline. Validate the input, redact secrets, run the prompt, validate the output. Every stage fails loud. No surprise costs, no leaked tokens, no malformed JSON downstream.

## Where to get it

vrk is open source and the binary is one curl away. Source and install instructions: [vrk.sh](https://vrk.sh).

The pitch in one sentence: classic Unix tools are excellent for humans and dangerous for agents. vrk fills the small set of gaps that show up the moment an LLM is the consumer at the end of the pipe. Use it next to your existing toolkit, not instead of it.
