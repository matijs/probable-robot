---
title: Why npm-update might not do what you would expect
date: 2021-04-28T19:25:00+01:00
lastMod: 2021-04-29T09:45:00+01:00
description:
  Why npm-update might not always do what you may expect because it respects
  semver and how caret versions below 1.0.0 are a bit special.
keywords:
  - npm
  - npm update
  - npm-update
  - dependencies
---

When React version 17 was released doing:

```shell
$ npm update react
```

Would not result in your project now containing React version 17, so why is
this?

From the `npm-update` [documentation][1] (emphasis mine)

> This command will update all the packages listed to the latest version
> (specified by the tag config), **respecting semver**.

The devil is in the details. `npm-update` will respect semver. So if your
`package.json` specifies `^16.8.0`, a minor or patch update would go through,
but a major would not.

In this case, updating to React version 17 is done using:

```shell
$ npm install react@latest
```

Or

```shell
$ npm install react@17
```

## Updating packages with a major version zero

A while ago Eleventy version 0.12.1 was [released][2]. One bullet in the release
notes said:

> Already installed in your local project? Upgrade your version: npm update
> @11ty/eleventy

It looks like this should work, `^0.11.1` (at the time) and `0.12.1` differ only
in the minor value so this looks like it respects semver. Well, apparently not
quite.

From the [semver spec][3]:

> [4.] Major version zero (0.y.z) is for initial development. Anything MAY
> change at any time. The public API SHOULD NOT be considered stable.

At this stage development is rapid and stuff potentially breaks all the time.

From the npm cli [documentation][4]:

> Many authors treat a 0.x version as if the x were the major "breaking-change"
> indicator.

This is how `npm-update` also treats major version zero packages. See [“Caret
Dependencies below 1.0.0"][5]. In other words Eleventy's version `0.11.1` and
`0.12.1` might as well have been `11.1` and `12.1` respectively. So, respecting
semver, `npm-update` will **not** just update from `^0.11.1` to `0.12.1` for
this reason.

So how do you update Eleventy from `0.11.1` to `0.12.1`? Explicitly like so:

```shell
$ npm install @11ty/elevent@latest
```

Or

```shell
$ npm install @11ty/eleventy@0.12
```

[1]: https://docs.npmjs.com/cli/v7/commands/npm-update
[2]: https://github.com/11ty/eleventy/releases/tag/v0.12.1
[3]: https://semver.org/spec/v2.0.0.html#spec-item-4
[4]: https://docs.npmjs.com/cli/v7/using-npm/semver#caret-ranges-123-025-004
[5]:
  https://docs.npmjs.com/cli/v7/commands/npm-update#caret-dependencies-below-100
