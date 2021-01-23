---
title: 'Useful shell history expansion'
date: 2018-07-27T10:16:17+02:00
keywords:
  - bash
  - csh
  - zsh
  - history expansion
---

If you ever use the command line you may have run into the following. You enter
a command only to find out that you should have used 'sudo'. For example when
trying to copy a file to a location you don't have write access to.

```bash
$ cp foo /usr/local/bin
cp: /usr/local/bin/foo: Permission denied
```

To repeat the previous command preceded by 'sudo', you can use bash's (and csh's
and the ever popular zsh's) history expansion.

```bash
$ sudo !!
sudo cp foo /usr/local/bin/
Password:
```

The first `!` starts history expansion. It is followed by a number (the event
designator) pointing to the command to use. This number can be negative. To
repeat the previous command you would use `!-1`. The even shorter event
designator `!!` in the example above is shorthand for this specific case. As you
can see the shell will echo the expanded command that it will then immediately
execute.

`!!` is useful for repeating entire commands but what if you want to use just
parts of a previous command? That is possible by adding a colon followed by a so
called word designator.

To get the last 'word' from the previous command you would use `!!:$` or even
shorter `!$`. If, for example, you wanted to create a directory and change into
it without having to retype the path you could use:

```bash
$ mkdir -p foo/bar/baz
$ cd !$
cd foo/bar/baz
```

(The `-p` parameter used for the `mkdir` command will create all necessary
parent directories if needed.)

There is a lot more you can do with
[history expansion](https://www.gnu.org/software/bash/manual/bashref.html#History-Interaction)
in specific situations. I have found that these two already make a big
difference on a daily basis.
