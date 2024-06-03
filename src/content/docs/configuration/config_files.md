---
title: Configuration files
description: Configuration files for NimForUE
---

# game.json

The `game.json` file is the main configuration file for NimForUE. It can contains the following fields:
- `bpOnly` - By default set to `true`. This fields defines if bindings to Unreal Engine modules should be limited only to those exposed to Blueprints. Setting it to false will cause full bindings to be generated for all included modules (`.uproject` and `extraModuleNames`). To generate full bindings only for specific modules, use `extraNonBpModuleNames` field.
- `extraModuleNames` - By default NimForUE generates bondings only for modules listed in the `.uproject` file. This fields allows specifying a list of additional modules to generate bindings for.
- `extraNonBpModuleNames` - By default Nim will generate module bindings only for things exposed to blueprint. If you want fo generate full bindings to a specified module, you should add it to this property.
- `vctoolset` - The version of Visual Studio to use for building the project. You can find the version used by Unreal Engine in the `Plugins/NimForUE/toolchain_dir.txt` file.

The `game.json` file should be placed in the `/NimForUE` directory alongside your Nim code.

After making changes to the file run `./nue genbindingsall` and then `./nue game` to recompile the Nim code.

```json title="game.json example"
{
  "extraModuleNames": ["GameplayTasks"],
  "extraNonBpModuleNames": ["PCG", "GameplayTasks"],
  "vctoolset": "14.33.31629"
}
```
