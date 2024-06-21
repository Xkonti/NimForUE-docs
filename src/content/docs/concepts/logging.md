---
title: Logging
description: Ways to log messages in NimForUE for debugging purposes.
---

Akin to the `UE_LOG` macro in C++, NimForUE has a proc for each [level](https://dev.epicgames.com/documentation/en-us/unreal-engine/logging-in-unreal-engine#logverbosity)

```nim
UE_Log "Actor overlaped whatev1"
UE_Warn "Hello from Aactor2"
UE_Error &"Error struct is null"
```

Likewise, `AddOnScreenDebugMessage` is available as `printString` on any child of `UObject` with default values for the arguments:

```nim
proc printString*(worldContextObject : UObjectPtr;
                  inString : FString = "Hello";
                  bPrintToScreen : bool = true;
                  bPrintToLog : bool = true; textColor : FLinearColor = makeFLinearColor(
    "(R=0.000000,G=0.660000,B=1.000000,A=1.000000)");
                  duration : float32 = 2.0'f32;
                  key : FName = makeFName("None"))
```
