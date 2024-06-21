---
title: Set & Clear Timers
description: .
---

```nim
uClass ABoom of AActor:
  uprops:
    timerHandle: FTimerHandle
    countdown: int = 5

  ufuncs(BlueprintCallable, Category = "Boom methods"):
    proc start() =
      self.timerHandle = self.setTimer("onTimer", 1.0, true, true)

  ufuncs:
    proc onTimer() =
      if (self.countdown - 1 == 0):
        self.clearTimerHandle(self.timerHandle)
        self.printString("Big Bada Boom")
        return
      self.countdown = self.countdown - 1
      self.printString(fmt"Boom in {self.countdown} seconds")
```
