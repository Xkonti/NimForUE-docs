---
title: Macro specifiers
description: .
---

Unreal Engine macros take a variety of specifiers that can be used to modify the behavior of uClasses, uFunctions, uProperties, uStructs, etc.
In NimForUE, you can specify those in a similar way to how you would in C++:

```nim
uClass AMyActor of AActor:
  (BlueprintType, Blueprintable) # uClass specifiers
  uprops(EditAnywhere, BlueprintReadWrite): # uProperty specifiers
    myInt: int32
  ufuncs(CallInEditor): # uFunction specifiers
    proc myFunc() =
      log "Hello from Nim"
```

## Type specifiers

All Unreal Engine type specifiers are available in NimForUE. They have exactly the same names and meanings as in C++. You can find a list of specifiers available for various Unreal Engine types in the Unreal Engine documentation:
- [uProperty specifiers](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-uproperties)
- [uStruct specifiers](https://dev.epicgames.com/documentation/en-us/unreal-engine/structs-in-unreal-engine)
- [uInterface specifiers](https://dev.epicgames.com/documentation/en-us/unreal-engine/interfaces-in-unreal-engine)
- [uFunction specifiers](https://dev.epicgames.com/documentation/en-us/unreal-engine/ufunctions-in-unreal-engine)
- [uClass specifiers](https://dev.epicgames.com/documentation/en-us/unreal-engine/class-specifiers)

## Metadata specifiers

When declaring classes, interfaces, structs, enums, enum values, functions, or properties, you can add Metadata Specifiers to control how they interact with various aspects of the engine and editor.
Metadata specifiers in NimForUE don't require the `Meta(...)` wrapper that is used in C++. Instead, you can just use the metadata specifier directly:

```nim
uClass UBlueprintFunctionLibraryA of UBlueprintFunctionLibrary:
  ufuncs(Static, BlueprintCallable, BlueprintPure, CompactNodeTitle="Pi", ToolTip="This function returns the value of Pi"):
    proc GetMyPi(): float64 =
      result = valueOfPi
```

You can find a list of metadata specifiers available for various Unreal Engine types in the [Unreal Engine documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine/metadata-specifiers-in-unreal-engine)

## Additional specifiers

In addition to making C++ specifiers available in NimForUE, we also provide some additional specifiers that are specific to NimForUE.

### `Static` specifier

The `Static` specifier is used to declare static functions in NimForUE. It is equivalent to the `static` specifier in C++.

```nim
uClass UBlueprintFunctionLibraryA of UBlueprintFunctionLibrary:
  ufuncs(Static, BlueprintCallable):
    proc MyStaticFunc() =
      log "Hello from a static function"
```