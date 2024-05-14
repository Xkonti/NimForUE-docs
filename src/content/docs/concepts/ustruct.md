---
title: USTRUCT type
description: Defining a USTRUCT in Nim.
---

## The `uStruct` macro

```nim
uStruct FAverages:
    (BlueprintType)
    uprop(BlueprintReadOnly):
      modal: float32
      mean: float32
      median: float32
```