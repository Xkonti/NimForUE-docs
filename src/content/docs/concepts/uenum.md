---
title: UENUM type
description: Defining a UENUM type in Nim.
---

## The `uEnum` macro

```nim
uEnum EMyEnumCreatedInDsl:
    (BlueprintType)
    WhateverEnumValue
    SomethingElse
```

## Creating manually

```nim
const ueEnumType = UEType(name: "EMyTestEnum", kind: uetEnum,
                            fields: @[
                              UEField(kind: uefEnumVal, name: "TestValue"),
                              UEField(kind: uefEnumVal, name: "TestValue2")
  ]
)

genType(ueEnumType)
```