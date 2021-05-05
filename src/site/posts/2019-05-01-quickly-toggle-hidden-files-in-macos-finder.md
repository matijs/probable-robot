---
title: Quickly toggle hidden files in macOS's Finder
date: 2019-05-01T22:10:34+02:00
description:
  How to quickly (or permanently) toggle hidden files in macOS's Finder and
  other macOS file dialogs
keywords:
  - macOS
  - Finder
  - keyboard shortcut
  - hidden file
  - mac toggle hidden file
  - file dialog
---

By default macOS's Finder will not show hidden files. This can be overridden
using the `defaults` command line utility and restarting Finder.

```bash
$ defaults write com.apple.finder AppleShowAllFiles -bool TRUE
$ killall Finder
```

However, this will **always** show all hidden files until the above is undone by
replacing `TRUE` with `FALSE`. This looks messy and may not be what you want and
having to retype the above snippet every time is not very convenient.

As it turns out, since macOS Sierra there is a keyboard shortcut that will
toggle the visibility of hidden files and folders:  
**<kbd>Shift</kbd>&nbsp;+&nbsp; <kbd>Command</kbd>&nbsp;+&nbsp;<kbd>.</kbd>**
(full stop). Strangely this very useful shortcut is not mentioned on Apple's
[Mac keyboard shortcuts](https://support.apple.com/en-us/HT201236#finder) page.

**Update:** The hidden `.DS_Store` files that Finder creates in every folder it
enters, never show up when asking it to show hidden files.
