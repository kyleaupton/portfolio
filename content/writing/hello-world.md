---
title: Hello, world
description: A placeholder post that exercises every piece of the reading page before anything real gets published.
date: 2026-10-03
draft: true
cover: https://picsum.photos/seed/kyleupton-hello/1200/630
---

This post exists to check the reading page: typography, code highlighting, images, and custom components rendered from Markdown. It stays a draft, so it only shows up in development.

## Why a test post

A reading page is mostly typography. Line length, spacing and contrast decide whether a long article is comfortable or tiring, and none of that can be judged against an empty page. So this one has a bit of everything.

### Things worth checking

- Paragraph rhythm and line length at around 68 characters
- Heading hierarchy and anchor links
- Inline `code`, **bold**, *italics* and [links](https://kyleupton.dev)
- Light and dark mode

## Code

Code blocks are highlighted at build time by Shiki, so no syntax highlighter ships to the browser.

```ts [server/routes/hello.ts]
export default defineEventHandler((event) => {
  const name = getQuery(event).name ?? 'world'
  return { message: `Hello, ${name}` }
})
```

## Quotes

> Programs must be written for people to read, and only incidentally for machines to execute.
>
> Harold Abelson

## Images

![A placeholder landscape photo](https://picsum.photos/seed/kyleupton-inline/1200/700)

## Components

Vue components in `app/components/content/` can be used directly in a post through MDC:

::click-counter{label="Times clicked"}
::

That's it. Real posts will replace this one.
