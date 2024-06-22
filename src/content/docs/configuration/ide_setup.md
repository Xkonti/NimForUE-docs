---
title: IDE Setup
description: Setting up your editor for NimForUE
---

NimForUE works best with [`nimlangserver`](https://github.com/nim-lang/langserver), the official [LSP](https://microsoft.github.io/language-server-protocol/) of nim.

## VSCode

VSCode should be supported out of the box using the [official nim extension](https://marketplace.visualstudio.com/items?itemName=NimLang.nimlang)


## Neovim

For neovim users the `nimlangserver` is part of the official `nvim-lspconfig` and should also work out of the box. 

For vim users of users who don't rely on `nvim-lspconfig` you can still check the expected options from the [config file](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#nim_langserver)
