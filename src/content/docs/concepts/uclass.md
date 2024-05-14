---
title: UCLASS type
description: Ways to create a UCLASS in Nim.
---

## The `uClass` macro

The `uClass` macro is used to define a UCLASS in Nim - equivalent to the `UCLASS` macro in C++. 

```nim
uClass AMyNimActor of AActor:
  uprops:
    myInt: int32
  ufuncs(CallInEditor):
    proc myFunc() =
      log "Hello from Nim"
```

The `uClass` allows for using [`uprop`](/concepts/uproperty) and [`ufuncs`](/concepts/ufunction) macros to define properties and functions of the class.

## The `default` keyword

```nim
uClass AActorChild of AActorParent:
  (Blueprintable, BlueprintType)
  uprops(EditAnywhere):
    test12 : FString

  default:
    primaryActorTick.bCanEverTick = true
    primaryActorTick.bStartWithTickEnabled = true;
```

## The `override` keyword

```nim
uClass ANimBeginPlayOverrideActorChild of ANimBeginPlayOverrideActor:
  (Blueprintable, BlueprintType)
  uprops(EditAnywhere):
    test12 : FString

  default:
    primaryActorTick.bCanEverTick = true
    primaryActorTick.bStartWithTickEnabled = true;

  override:
    proc beginPlay() =
      UE_Warn "Native BeginPlay called in the child!"
      super(self)

    proc isListedInSceneOutliner() : bool {. constcpp .} =
      UE_Log "IsListedInSceneOutliner called in the child"
      self.super()

    proc canEditChange(inProperty {. constcpp .} : FPropertyPtr) : bool {. constcpp .} =
      UE_Log "CanEditChange called in the child updated 1"
      self.super(inProperty)
```

## The `uConstructor` pragma

You can define custom constructors for classes:

```nim
proc myExampleActorCostructor(self: AExampleActorPtr, initializer: FObjectInitializer) {.uConstructor.} =
  UE_Log "The constructor is called for the actor"
  self.anotherVale = 5

  #you can override the values set by the default constructor too since they are added adhoc before this constructor is called.
  self.predValue = "Hello World"
```