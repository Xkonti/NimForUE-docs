---
title: Overriding Not Exposed Functions
description: A short guide on how to override not exposed virtual functions
---

NimForUE generates bindings only to a subset of the Unreal Engine API that is exposed to Blueprints. But what if we really need to override a virtual function that is not exposed to Blueprints?

Let say that we want to override a vitual function in the native, non exposed `UDefaultSizedThumbnailRenderer` class. The first thing we need to do is to add `UnrealEd` to our bindings in the [`game.json`](/configuration/config-files) file:

```json
{
  "extraModuleNames": ["UnrealEd"],
  "extraNonBpModuleNames": ["UnrealEd"]
}
```

Afterwards, run the `./nue genbindingsall` command to regenerate the bindings.

The bindings generated for `UDefaultSizedThumbnailRenderer` look like this:

```nim
type
  UDefaultSizedThumbnailRenderer* {.importcpp: "$1_", inheritable, pure,
                                    header: "UEGenBindings.h".} = object of UThumbnailRenderer
    defaultSizeX*: int32
    defaultSizeY*: int32
```

As you can see, bindings have a `$1_` which means that it's a type we are generating (you can see see that in the `export` version of the bindings).

Since we want to override a `virtual` (C++) function, we need to add the actual type to the [PCH (Precompiled headers)](https://en.wikipedia.org/wiki/Precompiled_header). Since we can't load every single Unreal Engine type to the common PCH (`UEDeps.h`), we need to add the ones that we need game PCH.

In the game folder, just near the `game.json` we need to add a `nuegame.h` file and then a include to the header:

```cpp
#include "Editor/UnrealEd/Classes/ThumbnailRendering/DefaultSizedThumbnailRenderer.h"
```

Since Unreal Engine doesn't know that file exists yet, we need to trigger a change in the Unreal Build Tools (UBT) side of things. Just add an empty space or something to `NimForUE.build.cs`.

:::note
A PR has been accepted that adds a way to trigger this without manually adding the change, i.e. a cmd that invalidates the UBT cache for the NimForUE plugin or the just the NimForUE module.
:::

Then, delete the `.headerdata` file and run the `./nue genbindingsall` command again. The bindings will be updated and look like this:

```nim
type
  UDefaultSizedThumbnailRenderer* {.importcpp, inheritable, pure.} = object of UThumbnailRenderer
    defaultSizeX* {.importcpp: "DefaultSizeX".}: int32
    defaultSizeY* {.importcpp: "DefaultSizeY".}: int32
```

They dont have the `$1_`, whic means we are using the actual C++ type and we can override it.

Using this method you can tweak the PCH includes even further.