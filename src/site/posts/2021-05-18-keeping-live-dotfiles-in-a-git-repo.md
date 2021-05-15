---
title: Keeping ‘live‘ dotfiles in a Git repo
date: 2021-05-18T12:00:00+01:00
description:
  How to keep a ‘live’ version of dotfiles in a git repository without having to
  sync or symlink to a repository elsewhere on your machine
keywords:
  - git
  - dotfiles
  - live
  - $HOME
  - vim
  - bash
  - zshrc
  - bashrc
  - bash_profile
  - home directory
  - tilde
---

Dotfiles are hidden files that usually live in a user's home directory (or
subdirectories of the home directory) to store per-user settings.

Some people keep their dotfiles in a repository which, in theory, makes it easy
to share the same set of dotfiles between multiple machines. Doing this usually
involves some way of syncing (specific files in) a home directory with a
repository or symlinking from a home directory to a repository.

For a long time I used `rsync` to keep the dotfiles in my home directory in sync
with a Git repository. Somehow I always ended up with some Franken-version of my
(old and somewhat outdated) [dotfiles][1] because I forgot to either sync or
push from one of my machines.

The obvious solution might be to turn the home directory itself into a
repository. Unfortunately this has has some annoying side effects.

Git does all of its housekeeping in a (hidden) directory called `.git/` in the
root of a repository. Running `git status` in the root or any of the
subdirectories of the repository will find this directory and return the status
of the working tree.

For this reason, having a `.git/` directory in your home directory, turns it
into a repository root. This is not in and of itself annoying, unless, like
me[^1], you[^2] use some magic to show some relevant Git information in your
prompt. In that case, every subdirectory of your home directory would report for
example the current branch your home directory was on.

## A ‘live’ solution

There is a way to turn a home directory into a ‘live‘ repository. Git can be
configured to do its housekeeping in a directory that you can name yourself.

Let's use `.dotfiles/`.

```bash
~ $ git --git-dir="$HOME/.dotfiles" --work-tree="$HOME" init
```

This will create a (git-dir) directory `.dotfiles/` in the home directory where
Git will do its housekeeping instead of `.git/`. It wil also configure the
repository and set the working tree to be the home directory itself.

Because not all files in a home directory need to be tracked, also add the
following.

```bash
~ $ git --git-dir "$HOME/.dotfiles" config status.showUntrackedFiles no
```

With this setting, Git will only show files that are being tracked. This is a
good setting to have for a repository in which we will only be tracking a
limited number of files. Otherwise commands such as `git status` would be
extremely noisy.

The repository is now ready and can be used almost like any other repository.
You can add a remote, add files to track, commit and push to a remote. There is
a drawback however (there always is). For Git to be able to work with a
non-standard git-dir you need to tell Git where to find it _for every command_.

For example, instead of the following command (that will not work in your home
directory—try it).

```bash
~ $ git status
fatal: not a git repository (or any of the parent directories): .git
```

You need to explicitly tell Git about the git-dir.

```bash
~ $ git --git-dir="$HOME/.dotfiles" status
```

However, adding `--git-dir "$HOME/.dotfiles"` to every Git command is a lot of
typing, so let's have a look at two ways around this.

## 1. Run all Git commands from inside the git-dir

The easiest (and possibly safest) way is to run all Git commands from within the
git-dir (`~/.dotfiles/`) itself.

```bash
~ $ cd "$HOME/.dotfiles"
.dotfiles [main] $ git status
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

Notice how the command prompt in the example above picks up that we are on the
main branch.

## 2. Setting a `GIT_DIR` environment variable

Another way is to (temporarily) export a `GIT_DIR` environment variable. This
makes the home directory behave like any other working tree.

```bash
~ $ export GIT_DIR="$HOME/.dotfiles"
~ [main] $ git status
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

Again, notice how the command prompt in the example picks up that we are on the
main branch.

It is important to unset the `GIT_DIR` again when you're done. If you do not,
all repositories that live in subdirectories of the home directory will be
unusable because Git will use `~/.dotfiles/` as the git-dir. A `GIT_DIR`
environment variable beats the presence of a `.git/` directory.

```bash
~ [main] $ unset GIT_DIR
~ $
```

Everything is back to normal now.

## Setting things up on a new computer

Cloning a repository into a directory that already contains files is not
possible. So ‘cloning‘ into a home directory that undoubtedly already contains
files needs to be done slightly differently.

On a new machine, start by repeating the steps for setting up the repository.

```bash
~ $ git --git-dir="$HOME/.dotfiles" --work-tree="$HOME" init
~ $ export GIT_DIR="$HOME/.dotfiles"
~ [main] $ git config status.showUntrackedFiles no
```

Then add your remote and fetch to download objects and refs from the remote.

```bash
~ [main] $ git remote add origin <url>
~ [main] $ git fetch
# Git fetching from origin
```

In an empty working tree, pulling or merging would work fine. But since this is
a home directory, chances are there are already a lot of files like `.zshrc` or
`.bashrc` that would be overwritten by a checkout. Trying this will make Git
abort and complain.

What does work however is to reset the state of our local repository to the
state of `origin/main`.

**Warning: The next command will overwrite local files with files from the
remote.**

```bash
~ [main] $ git reset --hard origin/main
```

And that is all there is to it. From now on it is possible to add or remove
files like with any other repository. Logging out and back in again should have
you end up in a familiar environment.

## Final remarks

To make sure that some sensitive directories never end up on a remote, I have
added a few of them to my global Git ignore file[^3].

Git does not allow adding `.git/` directories and will silently ignore you when
you try to add it anyway or loudly complain if you try to add a file inside it.
I added `dotfiles/` to have a similar effect.

I also added `.ssh/`. There are only things in there that I would never want to
share across machines.

And finally `.bash_history` just to make sure that is never accidentally added.

[^1]: I use Git's own [`git-prompt.sh`][2]
[^2]: Or your [Oh My Zsh][3] prompt
[^3]: Git's default: `~/.config/git/ignore`

[1]: https://github.com/matijs/dotfiles
[2]:
  https://github.com/matijs/live-dotfiles/blob/fec5ee631918f9fd2dde56a7045613f21a7a1f0d/.bash/prompt#L3
[3]: https://github.com/ohmyzsh/ohmyzsh
