---
title: UFUNCTION type
description: Ways to mark procs as UFUNCTION.
---

## The `uFunctions` macro

```nim
uFunctions:
  (BlueprintCallable, self:AExampleActorPtr) #you must specify the type and any shared meta like this.

  proc anotherUFunction(param : FString) : int32 = 10 #now you can define the function as you normally would.
  proc yetAnotherUFunction(param : FString) : FString =
    self.getName() #you can access to the actor itself by the name you specify in the uFunctions macro.

  proc customPragma(param : FString) : int32 {. BlueprintPure .} = 10 #you can also specify custom pragmas per functions rather than creating a new block

  proc callFromTheEditor() {. CallInEditor .} =
    UE_Log "Call from the editor. Changed again now with the watcher. Was change this, asa"
  proc test(param:int32) = discard
```

## The `ufuncs` keyword

The `ufuncs` keyword is used to mark procedures in Nim as `UFUNCTION` in Unreal Engine.
It can be used only from within the `uClass` macro.

`ufuncs` allows for specifying multiple procedures at once - all of them will be marked as `UFUNCTION` with the provided specifiers.

```nim

## Example

```nim
uClass UConstantsLibrary of UBlueprintFunctionLibrary:
  ufuncs(Static, BlueprintCallable, BlueprintPure):
    proc getPi(): float64 =
      return 3.14
    proc getE(): float64 =
      return 2.71828
```

## The `ufunc` pragma

```nim
proc myUFunction(self: AExampleActorPtr, param : FString) : int32 {. ufunc, BlueprintCallable .} =
  UE_Log "UFunction called"
  5
```