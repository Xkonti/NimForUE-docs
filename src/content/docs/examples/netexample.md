---
title: Network replication example
description: Sshowcases the Net working features that just got implemented
---

```nim
uClass AReplicatedActor of AActor:
  uprops(EditAnywhere, BlueprintReadWrite, ReplicatedUsing=onRepReplicatedVar):
    replicatedVar: float32
  #Notice you can pass Cond and RepNotify as parameters.
  uprops(EditAnywhere, BlueprintReadWrite, Replicated, Cond=InitialOnly, RepNotify=Always):
    anotherReplicatedVar: float32
  
  defaults:              
    #When an actor is set to be replicated. On spawn (only the server should spawn it), the server will replicate the actor to all clients.
    #If replicate movement is enabled, it will also replicate the Location, Rotation and Velocity of the Actor.
    bReplicates = true 
    setReplicateMovement true    

  ufuncs:
    proc onRepReplicatedVar() = 
      #Notice this is only called in the client by default (like in C++). One can call it in the server by calling it explicitly
      printString self, "replicatedVar has been replicated", duration = 5

    proc beginPlay() = 
      if self.hasAuthority: #You can only modify var to be replicated in the server
        self.replicatedVar = 10 
        printString self, "replicatedVar has been set to 10", duration = 5
      let role = self.getLocalRole()
      log "Role: {role}"      
    
  ufuncs(BlueprintCallable, Reliable, Server):
    proc serverRPCTest(n: float32) = 
      assert self.hasAuthority()
      printString self, "serverRPCTest", duration = 5
      self.multicastRPCTest()
      self.clientRPCTest()

  ufuncs(BlueprintCallable, Client):
    proc clientRPCTest() = 
      printString self, "clientRPCTest", duration = 5

  ufuncs(BlueprintCallable, NetMulticast):
    proc multicastRPCTest() = 
      printString self, "multicastRPCTest", duration = 5
```

Replicated vars can have optionally two Metas Cond and RepNotify the values are pretty much the ones in `ELifetimeCondition` and `ELifetimeRepNotifyCondition` without the prefix.

You can also pass over a function when `ReplicatedUsing`.

The `uClass` macro will expand `getLifetimeReplicatedProps` when a `uprop` is marked as `Replicated` or `ReplicatedUsing` to something like:

```nim
proc getLifetimeReplicatedProps(outLifetimeProps: var TArray[FLifetimeProperty]) {. virtual, override, constcpp.} =    
    super(outLifetimeProps)  

    let prop = self.getClass.getFPropertyByName("replicatedVar")
    var lifetimeParams = FDoRepLifetimeParams(condition: COND_None, repNotifyCondition: REPNOTIFY_OnChanged)
    registerReplicatedLifetimeProperty(prop, outLifetimeProps, lifetimeParams)
```

This way the user doesnt have to do write it - notice in the example: there is only one prop expanded, but in the code of the example there will be two.