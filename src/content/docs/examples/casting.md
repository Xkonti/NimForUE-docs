---
title: Casting example
description: An example of casting using ueCast
---

## ueCast

```nim mark={5-8}
proc MoveToLocation(actor: AActorPtr, location: FVector) =
  var hitResult: FHitResult
  discard actor.setActorLocation(location, false, hitResult, false)
  let rootComponent = actor.getRootComponent()
  # Cast the rootComponent to UPrimitiveComponent
  let primitiveComponent = ueCast[UPrimitiveComponent](rootComponent)
  # If cast fails it returns nil pointer
  if primitiveComponent.isNil: return
  primitiveComponent.setPhysicsLinearVelocity(makeFVector(100,0,0))
```

## Other options

Possibly there are other ways to cast:
- `tryUECast` - `func tryUECast*[T : UObject](obj:UObjectPtr) : Option[ptr T]` - wraps the cast pointer in `Option[ptr T]`
- `tryCast` - `func tryCast*[T: SomePointer](pntr: SomePointer): Option[T]`