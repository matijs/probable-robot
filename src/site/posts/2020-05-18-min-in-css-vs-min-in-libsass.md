---
title: min() in CSS vs. min() in LibSass
date: 2020-05-18T14:48:45+02:00
description:
  An explanation on why CSS's min function and node-sass do not work together
  and a possible solution
keywords:
  - libsass
  - node-sass
  - nodesass
  - sass
  - CSS min function
  - Sass min function
---

The other day a friend asked if I had ever seen `node-sass` error with:

```bash
Internal Error: Incompatible units: '%' and 'rem'.
```

I didn't think I ever had, but I remembered reading about the relatively new
[`min()`](https://drafts.csswg.org/css-values-4/#calc-notation) function in CSS
only the week before. It was added in the Values and Units Module Level 4.

The error, in this case, was caused by this tiny snippet:

```css
.selector {
  padding-top: min(10%, 1rem);
}
```

Sass has had a `min()` (and `max()`)
[function](https://sass-lang.com/documentation/syntax/special-functions#min-and-max)
since long before it was added to CSS. LibSass (which is used by `node-sass`
under the hood) will currently **always** parse the `min()` (and `max()`)
function and that is what causes the error in this case.

LibSass tries to parse the value at compile time, when it is unknown exactly
which of the two (in this case `10%` or `1rem`) is the smallest one, hence the
error. CSS would parse the above snippet at run time and therefore knows exactly
which of the two is the smallest.

Dart Sass has no problem outputting the correct CSS call to `min()`. So if you
want or have to use Sass in a project, your best bet is to use Dart Sass
([`sass`](https://www.npmjs.com/package/sass) in the npm registry).
