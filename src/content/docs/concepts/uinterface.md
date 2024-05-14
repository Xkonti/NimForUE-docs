---
title: UINTERFACE type
description: Define UINTERFACE type in Nim.
---

Does this macro exist?

```cpp
// Declaration
UINTERFACE(MinimalAPI)
class UMyInterface : public UInterface
{
    GENERATED_BODY()
}

// Definition
class IMyInterface
{
    GENERATED_IINTERFACE_BODY()

    virtual void MyFunction() = 0;
};

// Usage
class AMyClass : public AActor, public IMyInterface
{
    GENERATED_BODY()

public:
    virtual void MyFunction() override
    {
        // Implementation here
    }
};
```