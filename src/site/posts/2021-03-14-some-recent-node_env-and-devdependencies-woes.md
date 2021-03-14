---
title: Some recent NODE_ENV and devDependencies woes
date: 2021-03-14T20:10:05+01:00
description:
  How a Dependabot pull request, a broken build, a stray NODE_ENV environment
  variable and devDependencies that should have been dependecies taught me
  things about npm.
keywords:
  - NODE_ENV
  - dependencies
  - devDependencies
  - npm
  - Dependabot
  - 11ty
  - eleventy
  - SSG
---

This site recently switched from Hugo to Eleventy. That meant dependencies that
needed to be kept up to date. For this I use GitHub's amazing [Dependabot][1].
This worked flawlessly up until earlier this week. Dependabot had created a pull
request to bump the version of [eleventy-plugin-syntaxhighlight][2] from 3.0.6
to 3.1.0 which somehow broke the build of the site.

As it was only a minor version bump nothing should have broken the build. Time
to figure out what went wrong, where it went wrong and why it went wrong.

## Problem numero uno

On my local machine everything was still building fine. It was only on Netlify's
build servers that things went wrong. Strange.

Netlify's build logs showed that the Eleventy config complained about needing
JSDOM but could not find it. This was even stranger as the [change][3] in
`@11ty/eleventy-plugin-syntaxhighlight` that caused the version bump was about
switching out JSDOM for LinkeDOM.

Either way, something seemed to be off with that dependency. Upon closer
inspection I noticed that it was added under `devDependencies` and not under
`dependencies`. So maybe `devDependencies` weren't being installed. That was
easy enough to fix.

When you move a dependency from `dependencies` to `devDependencies` using
`npm install`[^1], with the `--save-dev` flag, it will give you the following
helpful message:

```shell
npm notice save <package-name> is being moved from dependencies to devDependencies
```

As it turns out this also works the other way around. To move a dependency from
`devDependencies` to `dependencies` use the `--save-prod` flag.

```shell
npm notice save <package-name> is being moved from devDependencies to dependencies
```

I thought that that was what `--save` did but apparently that flag was removed
around the time npm 5 [was released][4]! Who knew‽

Anyway, moving this (and a few other dependencies to `dependencies`) solved the
first issue. Netlify's build servers were once again happily building away.

## The other problem

With the first issue fixed, I still had to figure out why things were building
fine locally but not on Netlify's build servers. So why exactly were
`devDependencies` not installed?

From the [npm docs][5] for the `npm install` command:

> With the `--production` flag (or when the `NODE_ENV` environment variable is
> set to `production`), npm will not install modules listed in
> `devDependencies`.

That rang a bell! A little while ago I started a blogpost on [TailwindCSS][6].
Tailwind uses [PurgeCSS][7] to get production builds down to a more reasonable
size. With the `NODE_ENV` environment variable set to `production` Tailwind will
automatically purge unused styles from your CSS… and I had already added the
environment variable to the build server for the draft post. Doh.

So in the end what went ’wrong’[^2] was a combination of an environment variable
that only existed on the build server and a few dependencies being under
`devDependencies` in `package.json`.

[^1]: Instead of, you know, manually editing `package.json` like an animal.
[^2]: Actually not wrong at all but exactly according to all the docs.

[1]:
  https://docs.github.com/en/github/administering-a-repository/about-dependabot-version-updates
[2]: https://github.com/11ty/eleventy-plugin-syntaxhighlight
[3]:
  https://github.com/11ty/eleventy-plugin-syntaxhighlight/commit/47cb311e732a69800556c414099fa2636f527631
[4]: https://blog.npmjs.org/post/161081169345/v500
[5]: https://docs.npmjs.com/cli/v6/commands/npm-install
[6]: https://tailwindcss.com
[7]: https://purgecss.com
[8]: https://github.com/npm/cli/commit/9b55b798ed8f2b9be7b3199a1bfc23b1cd89c4cd
