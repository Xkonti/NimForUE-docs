---
title: IDE Setup
description: Setting up your editor for NimForUE
---

NimForUE works best with [`nimlangserver`](https://github.com/nim-lang/langserver), the official [LSP](https://microsoft.github.io/language-server-protocol/) of nim.

You can install it with nimble:
- release: `nimble install nimlangserver`
- dev/bleeding-edge: The nimlangserver lock being set to nim release but NimForUE requires devel, you need to manually install it as follow:
  ```sh
  git clone --recursive https://github.com/nim-lang/langserver
  cd langserver
  rm nimble.lock # the reason we need to clone it manually.
  nimble install # assuming ~/.nimble/bin is in PATH nothing else must be done
  ```

## VSCode

VSCode should be supported out of the box using the [official nim extension](https://marketplace.visualstudio.com/items?itemName=NimLang.nimlang)


## Neovim

For neovim users the `nimlangserver` is part of the official `nvim-lspconfig` and should also work out of the box. 

For vim users of users who don't rely on `nvim-lspconfig` you can still check the expected options from the [config file](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#nim_langserver)
