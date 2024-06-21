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

The `uClass` allows for using [`uprop`](../uproperty) and [`ufuncs`](../ufunction) macros to define properties and functions of the class.

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

As you can see, default's main use case is to access nested properties since for the top level ones you can define their default value inline, and even call other procs:

```nim
uClass ADoorActor of AActor:
  uprops(EditAnywhere, Category = "Door Settings"):
    mesh: UStaticMeshComponentPtr = createDefaultSubobject[UStaticMeshComponent](initializer, n"MyDoorMesh")
```

## The `override` pragma

Inside `ufuncs`, functions named as any of the cpp class overrides will be registered as an override. 
Outside `ufuncs` you can use the `{.virtual, override.}` pragma as follow:

```nim
uClass ANimBeginPlayOverrideActorChild of ANimBeginPlayOverrideActor:
  (Blueprintable, BlueprintType)
  uprops(EditAnywhere):
    test12 : FString

  default:
    primaryActorTick.bCanEverTick = true
    primaryActorTick.bStartWithTickEnabled = true;

  unfuncs:
    # here no need to do anything, both proc will be registered as overrides
    proc isListedInSceneOutliner() : bool {. constcpp .} =
      UE_Log "IsListedInSceneOutliner called in the child"
      self.super()

    proc canEditChange(inProperty {. constcpp .} : FPropertyPtr) : bool {. constcpp .} =
      UE_Log "CanEditChange called in the child updated 1"
      self.super(inProperty)
  
  # outside ufuncs we must specify the pragmas
  proc beginPlay() {.virtual, override.} =
    UE_Warn "Native BeginPlay called in the child!"
    super(self)

```

## Custom constructors

You can define custom constructors for classes, using the `proc constructor(initializer: FObjectInitializer)` signature:

```nim
uClass AExampleActor of AActor:
  (Blueprintable, BlueprintType)

  uprops(EditAnywhere, BlueprintReadWrite):
    predValue : FString = "Hello"
    anotherVale : int 

  proc constructor(initializer: FObjectInitializer) =
    UE_Log "The constructor is called for the actor"
    self.anotherVale = 5

    #you can override the values set by the default constructor too since they are added adhoc before this constructor is called.
    self.predValue = "Hello World"
```
