---
title: CSS and the hidden attribute
date: 2018-08-14T08:40:13+02:00
description:
  Some solutions on how to deal with HTML's 'hidden' attribute in CSS when using
  the display property
keywords:
  - CSS
  - hidden
  - hidden attribute
  - CSS attributes
  - CSS hidden attribute
---

The
[`hidden`](https://HTML.spec.whatwg.org/multipage/interaction.HTML#the-hidden-attribute)
attribute is used to hide content that is not yet or no longer relevant. Modern
browsers will prevent elements with a `hidden` attribute from being rendered by
applying `display: none` to the element.

Because of this, changing the value of the `display` property will override the
hiding behaviour. The `hidden` attribute on the `<div>` with class
`something-flex` in the example below may not do what you expect.

```html
<div class="something-flex" hidden>…</div>
```

```css
.something-flex {
  display: flex;
  /* … */
}
```

The user agent stylesheet would apply `display: none` to the `<div>` but this is
overridden by setting `display: flex` in the CSS.

How do we deal with this? There are a few possible solutions.

## Use `!important`

The easiest solution is probably to use good old `!important`.

```css
[hidden] {
  display: none !important;
}
```

This also makes the attribute work in browsers that do not natively support it.

## Make it explicit

If you want to avoid `!important`, another solution is to add the `[hidden]`
attribute selector to the selector of the element that needs hiding.

```css
.something-flex {
  display: flex;
  /* … */
}

.something-flex[hidden] {
  display: none;
}
```

This works, but does not scale so well. You will have to add this extra bit of
specificity just to be able to hide something.

## Keep it simple

A deceptively simple solution is to just add the CSS with the `[hidden]`
attribute selector last.

```css
.something-flex {
  display: flex;
  /* … */
}

.something-grid {
  display: grid;
  /* … */
}

[hidden] {
  display: none;
}
```

Like when using `!important`, this also has the added benefit of making the
attribute work in older browsers. Make sure to keep your selectors simple
though.

## Go for elegance

Probably the most elegant solution is to wrap the element you want to hide in
another element and add the `hidden` attribute to this wrapper element.

```html
<div class="wrapper" hidden>
  <div class="something-flex">…</div>
</div>
```

## Which method is the best?

Is there ever really a best way of doing things when it comes to CSS?

Personally, I prefer to keep it simple. Simple selectors, no extra elements and
the added benefit of making it work in older browsers. Making hiding explicit by
adding extra CSS is therefore not a favourite.

If you do not mind an extra wrapper element, the last method is probably the
most elegant. The element (or component) can stay clean. The wrapper element
takes care of the hiding 'logic'.

But if you do not care about the odd `!important` here and there, that may be
the easiest solution after all.
