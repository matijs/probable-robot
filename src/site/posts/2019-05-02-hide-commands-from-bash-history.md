---
title: Hide commands from Bash history
date: 2019-05-02T10:41:38+02:00
description: How to keep some commands out of Bash's history file
keywords:
  - bash
  - history
  - security
  - bash history
---

There are times where, as part of a command, you may have to type a password on
the command line. Unfortunately, all commands normally end up in your Bash
history (`~/.bash_history`) which might not be what you want.

The following example can be used to create a new repository on GitHub from the
command line.

```bash
$ curl -u user:token https://api.github.com/user/repo -d '{"name":"my-new-repository"}'
```

`token` in the example above should be replaced with a
[personal token](https://github.com/settings/tokens) that was created on GitHub.
This `token` should not end up in your history file.

To determine what should and should not end up in your Bash history, Bash checks
an environment variable called `HISTCONTROL`. This
[variable](https://www.gnu.org/software/bash/manual/bash.html#index-HISTCONTROL)
takes a colon-separated list of values. Adding the value `ignorespace` will
prevent commands that start with a **<kbd>space</kbd>** character from being
saved to history.

Setting `HISTCONTROL` is something you would normally do in `~/.bashrc` or
`~/.bash_profile`.

```bash
# do not save commands starting with a space in history
export HISTCONTROL=ignorespace
```

Bonus: to also prevent duplicate commands from being saved in history, use
`ignoreboth` instead of `ignorespace`.
