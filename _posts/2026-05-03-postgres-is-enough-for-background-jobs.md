---
layout: post
title: "Postgres is enough for background jobs"
date: 2026-05-03 09:00:00 +0530
author: Abhinav Saxena
tags:
  - Python
  - Postgres
  - Background Jobs
toc: true
summary: "Most apps do not need Redis to run background jobs. Two Postgres features (SKIP LOCKED and LISTEN/NOTIFY) cover the common cases with less infrastructure and stronger guarantees. Soniq is what you get when you take that idea seriously."
---

The reflex when a Python app needs background jobs is to reach for Celery, which means reaching for Redis, which means reaching for a third moving part: another service to run, monitor, back up, and reason about when something goes wrong.

For a lot of apps, that third moving part buys you nothing you could not get from the database you already have.

This is the argument behind Soniq. Background jobs in Python, persisted in Postgres, no broker, no separate result backend. The tagline says it plainly: *"Powered by the Postgres you already have. Nothing else to maintain."*

## The bug Redis cannot prevent

Here is the scenario that taught me to stop using a separate broker for small and mid-sized apps.

You have an endpoint that creates a User row and enqueues a "send welcome email" job. The order matters. If the job fires before the row commits, the worker reads the database and finds nothing. If the row commits but the enqueue fails, the user exists but never gets a welcome.

With Redis-backed queues, these are two different systems with two different transactions. You write code to make them consistent. You sometimes fail.

With Postgres-backed jobs, the job is a row in the same database as your User row. Both commit in the same transaction or neither does. The "row exists but the job never fired" bug stops being possible.

That alone is worth the switch for a class of apps. The fact that you also remove a service from the architecture is bonus.

## How it actually works

Two Postgres features carry most of the weight.

### SELECT ... FOR UPDATE SKIP LOCKED

The classic worry with database-backed queues is the thundering herd. A hundred workers all run SELECT * FROM jobs LIMIT 1 at the same time. They all get the same row. They fight.

SKIP LOCKED solves this in one keyword.

```sql
SELECT id, payload FROM jobs
WHERE state = 'queued' AND run_at <= now()
ORDER BY run_at
LIMIT 1
FOR UPDATE SKIP LOCKED;
```

Each worker locks one row. Other workers see the locked row, skip it, and pick the next one. No coordination. No fighting. Postgres handles the concurrency.

This is not a clever workaround. It is a feature designed for queue-like workloads, and it has been stable since Postgres 9.5 (2016).

### LISTEN / NOTIFY

The second worry is latency. Polling the jobs table every second works but feels wasteful. Five seconds of latency on a "send welcome email" job is fine. Five seconds on a "process payment" callback is not.

Postgres has a built-in pub/sub channel. The producer NOTIFYs when it inserts a job. Workers LISTEN on the channel and wake up immediately. Latency drops from polling-interval to single-digit milliseconds.

Combined, these two features give you the same operational shape as a Redis queue: instant pickup, safe concurrent workers, persistence, retries. Without the second service.

## What you get out of the box

Soniq packages this with the obvious surrounding pieces:

- Retries with exponential backoff
- Cron-style and one-off scheduled jobs
- Deduplication by job key
- Dead-letter queue for jobs that exhaust retries
- A web dashboard for inspection
- Prometheus metrics for the bits you would otherwise build yourself

The smallest useful program:

```python
from soniq import Soniq

app = Soniq(database_url="postgresql://localhost/myapp")

@app.job()
async def send_welcome(to: str):
    print(f"Sending welcome email to {to}")

await app.enqueue(send_welcome, to="dev@example.com")
```

Then run soniq setup once to create the tables, soniq worker to process jobs, and you are done. No broker config. No result backend.

## Where this falls down

I want to be honest about the limits, because every "you don't need X" post on the internet eventually runs into someone who does need X.

**Throughput.** Soniq comfortably handles up to about 10k jobs per second. Redis-backed queues can do an order of magnitude more. If you are sending 50k notifications a second through a single queue, you have outgrown this approach. You also probably know it.

**Cross-language workers.** Soniq is Python on both ends. Celery has a story for Ruby, Node, Go workers reading off the same queue. If your architecture genuinely needs that, this is not the tool.

**DAG orchestration.** Airflow and Prefect run pipelines of dependent jobs with retry semantics across the whole graph. Soniq runs individual jobs. They are different problems with different tools.

For everything else (the long tail of apps that need reliable async work, scheduled jobs, retries, and a place to look when something goes wrong) Postgres is enough.

## The broader pattern

This post is really about a smaller idea: prefer the boring database you already have over a new service, until the database stops being enough.

Most apps never reach the point where it stops being enough. They just reach the point where someone reaches for the new service out of habit, and adds a year of operational tax for no real benefit.

Soniq is one specific bet on that pattern. The site has the pitch in more detail and the docs are short: [soniq.abhinav.co](https://soniq.abhinav.co).
