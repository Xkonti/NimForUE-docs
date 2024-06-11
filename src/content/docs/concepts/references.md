---
title: References/pointers
description: How pointers (references) are handled in Nim.
---

Types defined in Nim and by Unreal Engine automatically get a pointer type generated for them. To get a pointer to a type, you can add `Ptr` to the end of the type name. For example, `AActor` has a pointer type `AActorPtr`.

```nim
uClass ACoolActor of AActor:
  ufuncs(BlueprintCallable):
    proc doSomethingCool() =
      ...
```

```nim
proc doSomethingCool(coolActor: ACoolActorPtr) =
  coolActor.doSomethingCool()
```