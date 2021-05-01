---
title: Keep your dirty laundry out of gitignore
date: 2021-04-16T12:25:14+01:00
description: Setting up and using a global git ignore file
keywords:
  - git
  - config
  - ignore
  - gitignore
  - .gitignore
  - .gitignore_global
  - excludesfile
  - $XDG
  - XDG
---

A project I recently worked on had a `.gitignore` file that contained over 100
lines[^1]. Most of these lines were irrelevant for this project, either at this
stage or . They were either editor (or IDE) specific lines or lines for tools
that would or would not be added at some point in the future.

The solution for this is to use a global `gitignore` file. There are plenty of
tutorials that explain how to configure Git this way. Usually this involves
setting `core.excludesfile` with the `--global` flag of `git-ignore`.

Git's ignore files are not particularly readable.

Ideally a project's _.gitignore_ file contains only project-related entries. So
if your project outputs to a _dist/_ directory that you don't want

I want to be able to check a _.gitignore_ file and see what is ignored, not have
to wade through lines and lines of excluded files of which I don't know why they
were excluded or that do not even apply to me.

All lines in a project's _.gitignore_ file should actually do something, either
for everybody or as the result of build or tooling output.

.env.dist -> .env where .env.dist is in the repository but the file containing
actual secrets is ignored.

## What belongs in a local _.gitignore_ file

- dependencies that are the result of an install step such as `npm install` or
  `composer install`.
- files with secrets such as `.env`
- build artefacts such as a `dist/` directory
- other files that are the results of various tools such log files or coverage
  files.

## What belongs in a global excludes file

Personal things. macOS's `.DS_Store` is only relevant for people that use a Mac.
Editor or IDE specific files. I use Vim and SublimeText I don't want to bother
you with my `.sublime-*` or `*.swp` files.

There are many tutorials on how to add a so called global `.gitignore` file to
define a list of rules for ignore files in every Git repository on your machine.

Most of these suggest creating a file named something like `.gitignore_global`
in your home directory and configuring Git to use this as a

```shell
$ git config --global core.excludesfile $HOME/.gitignore_global
```

Ever since version X.Y.Z, this has been built into Git. Git will look for
`$XDG_CONFIG_HOME/git/ignore` or if `$XDG_CONFIG_HOME` does not exist, for
`$HOME/.config/git/ignore` and ignore what's set there.

editors leave behind crap in your project that does not really belong there,
it's yours, not the projects

[^1]:
    When you create a new repository on GitHub it is possible to add a
    `.gitignore` file from a template. I recommend you do not do this but write
    your own.

[1]:
  https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
[2]: https://github.com/git/git/commit/dc79687e0b70805894d1b4432cef7164ae86e033
[3]: https://git-scm.com/docs/gitignore
