---
title: UPROPERTY type
description: Ways to mark fields as UPROPERTY.
---



## The `uprops` macro

The `uprops` macro is used to mark fields in Nim as `UPROPERTY` in Unreal Engine.
It can be used only from within the `uClass` macro. ???

`uprops` allows for specifying multiple fields at once - all of them will be marked as `UPROPERTY` with the provided specifiers.

```nim

## Example

```nim
uClass AMyActor of AActor:
  (BlueprintType, Blueprintable)
  
  uprops(EditAnywhere, BlueprintReadWrite):
    exampleValue : FString
    intVale : int32
    someDoubleValue : float64
    predValue : FString = "Hello"
```