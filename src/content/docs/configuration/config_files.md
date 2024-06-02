---
title: Configuration files
description: Configuration files for NimForUE
---

# game.json

The `game.json` file is the main configuration file for NimForUE. It contains the following fields:
- `extraModuleNames` - Array of string ???
- `extraNonBpModuleNames` - Array of strings ???
- `vctoolset` - The version of Visual Studio to use for building the project. You can find the version used by Unreal Engine in the `Plugins/NimForUE/toolchain_dir.txt` file.

The `game.json` file should be places in the `/NimForUE` directory alongside your Nim code.

```json title="game.json example"
{
  "extraModuleNames": ["GameplayTasks"],
  "extraNonBpModuleNames": ["PCG", "GameplayTasks"],
  "vctoolset": "14.33.31629"
}
```