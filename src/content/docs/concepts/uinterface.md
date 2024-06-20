---
title: UINTERFACE type
description: Define UINTERFACE type in Nim.
---

```nim
# Just decorate the ufuncs to be implemented with BlueprintImplementableEvent
uClass UMyInterface of UInterface:
  ufuncs(BlueprintImplementableEvent):
    proc myFunc() 

# And then implement it
uClass UMyUClass of UObject implements UMyInterface
   ufuncs:
     proc myFunc() = 
       log "whatever"
```

Then you can do

```nim
let myInterface: UMyInterface = newUObject[UMyClass]()
```

**Notice**: `implements` will generate a converter for you. static checking will be added in the future.
