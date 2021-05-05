---
title: About that first rule of ARIA
date: 2020-09-11T13:54:00+02:00
lastMod: 2021-01-26T20:42:00+01:00
description:
  And elegant way to add a meaningful label to icon buttons using an aria-label
  attribute.
keywords:
  - html
  - ARIA
  - first rule of ARIA
---

As you may know, the
[first rule of ARIA](https://www.w3.org/TR/using-aria/#rule1) is to avoid using
it when you can use a native HTML element or attribute that already has the
desired behaviour and semantics built-in.

That means that this …

```html
<div role="button">Submit</div>
```

…is terrible and this…

```html
<button type="submit">Submit</button>
```

…is how it should be done (or could be done, the `type` attribute may be omitted
which puts the button in the Submit Button state).

Now have a look at the following implementation of an accessible icon only
button (the actual `SVG` used for the icon was left out for brevity).

```html
<button type="button" class="icon-button">
  <svg aria-hidden="true">…</svg>
  <span class="visually-hidden">Open menu</span>
</button>
```

This is not a bad button. The `SVG` icon is hidden from assistive technology
(AT) using the `aria-hidden="true"` attribute. A `span` is used to add a
meaningful label for AT. It is then hidden from view using the visual hiding
technique du jour.

But now have a look at this implementation.

```html
<button type="button" class="icon-button" aria-label="Open menu">
  <svg aria-hidden="true">…</svg>
</button>
```

Again, the `SVG` icon is hidden from AT and the `<button>` was given an
`aria-label` attribute with a meaningful value that will be picked up by AT.

Much more elegant and not actually in violation of that famous first rule of
ARIA.
