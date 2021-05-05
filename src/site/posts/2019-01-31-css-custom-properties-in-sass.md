---
title: CSS Custom Properties in Sass
date: 2019-01-31T17:51:27+01:00
lastMod: 2021-02-08T14:36:14+01:00
description: How to make CSS Custom properties and Sass play nice together
keywords:
  - CSS
  - CCS custom properties
  - CSS variables
  - Sass
---

## TL;DR

Use `--my-var: #{$my-sass-variable};` to be able to use Sass variables as values
for CSS Custom Properties.

## The problem

Let's say you have the following SVG of a circle with an exclamation mark that
you want to inline in your markup.

```svg
<svg height="48" width="48" viewBox="0 0 48 48">
  <circle fill="currentColor" cx="24" cy="24" r="20" />
  <rect
    fill="#fff"
    x="21"
    y="10"
    width="6"
    height="18"
    style="fill: var(--fill, #fff)"
  />
  <circle fill="#fff" cx="24" cy="35" r="5" style="fill: var(--fill, #fff)" />
</svg>
```

If you want to change just one colour, in this case the circle, you can use a
`fill` attribute with `currentColor` as its value. This allows you to change the
background colour of the circle using SCSS, like so:

```scss
$dark-blue: #ff1493;

svg {
  color: $dark-blue;
}
```

This works perfectly fine but it is limited to just one colour. CSS Custom
Properties can help if you wanted to change more than just one colour.

The `<rect />` and the second `<circle />` in the SVG above have their `fill`
attribute set to white (`#fff`). In modern browsers this can be overriden using
CSS Custom Properties. The `style` attribute in the SVG above uses a custom
property `--fill` that can be given a value in SCSS to apply a different fill
colour [^1]. In SCSS it looks like this, but unfortunately this does not work.

```scss
$dark-blue: #ff1493;
$yellow: #800080;

svg {
  color: $dark-blue; // this does not work as expected
  --fill: $yellow;
}
```

What ended up in the browser was the following:

```css
svg {
  color: #ff1493;
  --fill: $yellow;
}
```

This obviously does not work and resulted in a black exclamation mark on a dark
blue background instead of the yellow exclamation mark that was expected.

In order to get this to work we need to use Sass’s interpolation `#{}` like so:

```scss
$dark-blue: #ff1493;
$yellow: #800080;

svg {
  color: $dark-blue;
  --fill: #{$yellow};
}
```

Et voilá, a beautiful multicolour SVG with proper fallback in browsers that do
not support Custom Properties.

<style>
  #css-custom-properties-in-sass {
    --fill: #800080;
    color: #ff1493;
    height: 4em;
    width: auto;
    margin: 0 auto;
    display: block;
  }
</style>
<svg id="css-custom-properties-in-sass" height="48" width="48" viewBox="0 0 48 48">
  <circle fill="currentColor" cx="24" cy="24" r="20" />
  <rect fill="#fff" x="21" y="10" width="6" height="18" style="fill: var(--fill, #fff)" />
  <circle fill="#fff" cx="24" cy="35" r="4" style="fill: var(--fill, #fff)" />
</svg>

Ok, so maybe not yellow on dark blue, but still pretty.

[^1]:
    It also still has a fallback value of `#fff` in case the variable was not
    set in the CSS of a browser that supports CSS Custom Properties.
