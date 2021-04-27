---
title: Using JavaScript modules embedded in HTML
date: 2021-04-27T21:36:00+01:00
description:
  A nifty trick using JavaScript modules embedded in HTML using a <script> tag
  with a `type="module"` attribute.
keywords:
  - javascript
  - embedded javascript
  - module
  - javascript module
  - cutting the mustard
  - HTML
---

Today I came across this [interesting article][1] by Manuel Matuzović. The whole
post is a nice read, but one nice trick jumped out for me. Manuel is [“cutting
the mustard”][2][^1] using this little embedded JavaScript snippet:

```html
<script type="module">
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');
</script>
```

Using the `type="module"` attribute makes sure that only modern browsers with
JavaScript module support run this snippet. Nifty!

I had never come across a `<script>` element with a `type="module"` attribute
that was not linking to the URI of an external script and I was wondering if
this was some sort of hack. So I tried the following snippet.

```html
<script type="module">
  const body = document.body;
  body.style.backgroundColor = 'deeppink';
  // beautiful
</script>
<script type="module">
  body.style.backgroundColor = 'purple';
  // Uncaught ReferenceError: body is not defined
</script>
```

A `const body` defined in the first module is available only in _that_ module
and trying to use it in the second module results in an
`Uncaught ReferenceError: body is not defined`. So of course it is not a hack.
It is behaving exactly as you would expect.

[^1]:
    The original website no longer exists 😔. Thankfully there's the Internet
    Archive.

[1]: https://www.matuzo.at/blog/html-boilerplate/
[2]:
  https://web.archive.org/web/20120718191331/http://blog.responsivenews.co.uk/post/18948466399/cutting-the-mustard
