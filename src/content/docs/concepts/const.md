---
title: constcpp pragma
description: Marking proc properties as const in NimForUE.
---

```nim
# Equivalent of C++ "const" keyword:
# virtual void PostRename( UObject* OldOuter, const FName OldName ) override;
proc postRename(oldOuter : UObjectPtr, oldName {.constcpp.} : FName) =
  self.super(oldOuter, oldName)
  UE_Warn "PostRename called !"
```