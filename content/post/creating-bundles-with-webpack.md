---
title: "Creating bundles with webpack"
slug: "creating-bundles-with-webpack"
date: 2018-09-04T08:38:26+02:00
tags:
  - webpack
  - javascript
  - tools
---
webpack is a bundler, so it is good at bundling things. Out of the box it only
understands JavaScript's `import` and `require` statements and because of that
can just bundle JavaScript. If you give it an entry point[^1], it will start
trawling through your code and bundle everything finds at `import` and
`require` statements into one bundle[^2].

A very minimal webpack configuration file looks like this.

`webpack.config.js`:
{{< highlight JavaScript "linenos=inline" >}}
const path = require('path');

module.exports = {
  mode: 'none', // just to supress warnings for now
  entry: path.resolve('./src/main.js'),
  output: {
    filename: 'main.bundle.js',
    path: path.resolve('./dist/')
  }
};
{{< /highlight >}}

`entry` on line 5 tells webpack where to start trawling through the code. The
`output` object on line 6 tells it in what directory to output the bundle and
what to name it.

So, what happens if we give webpack the basic snippet of code below?

`src/main.js`:
{{< highlight JavaScript "linenos=inline" >}}
import { format } from 'date-fns';

const formattedToday = format(new Date(), 'dddd DD MMMM');
const p = document.createElement('p');
p.textContent = `Today is ${formattedToday}`;

document.body.appendChild(p);
{{< /highlight >}}

This little code snippet depends on 'date-fns' which we will need to install
using `npm install --save date-fns`.

With the provided webpack configuation above, webpack can start to bundle our
code. On line 1, it will find the `import` statement for 'date-fns' which it
will follow. 'date-fns' ended up in `node_modules` when we installed it, which
is where webpack will find it because it knows how to deal with `import`
statements. 'date-fns' itself contains many more `require` statements that
webpack will dutifully follow until it has followed them all and pulled all
code it found into one big[^3] bundle.

This bundle will be named and written in the directory as specified in the
webpack configuration. In this case we will end up with a file named
`main.bundle.js` in the `dist/` directory of the root of our project.

That is how webpack does its bundling in a nutshell. Because it only knows
about `import` and `require` it is not extremely useful out of the box. In the
next article we will see how we can make it a lot more useful.

[^1]: As of webpack 4 if you do not provide an entry point, it will look for `src/index.js`.
[^2]: If you give webpack more than one entry point you will end up with an equal amount of bundles.
[^3]: In this case it is actually quite big because 'date-fns' is quite big and without any optimisation it will all get bundled.
