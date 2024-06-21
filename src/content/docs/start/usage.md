---
title: Using NimForUE
description: Basic explanation of how to use NimForUE.
---

## Examples
The whole Cpp ThirdPersonTemplate in Nim would be like this:

```nim
uClass ANimCharacter of ACharacter:
  (config=Game)
  uprops(EditAnywhere, BlueprintReadOnly, DefaultComponent, Category = Camera): # DefaultComponent ensures the component is created by the constructor
    cameraBoom : USpringArmComponentPtr 
  uprops(EditAnywhere, BlueprintReadOnly, DefaultComponent, Attach=(cameraBoom, SpringEndpoint), Category = Camera):
    followCamera : UCameraComponentPtr
  uprops(EditAnywhere, BlueprintReadOnly, Category = Input):
    defaultMappingContext : UInputMappingContextPtr
    (jumpAction, moveAction, lookAction) : UInputActionPtr

  defaults: # default values for properties on the cdo
    capsuleComponent.capsuleRadius = 40
    capsuleComponent.capsuleHalfHeight = 96
    bUseControllerRotationYaw = false
    characterMovement.jumpZVelocity = 700
    characterMovement.airControl = 0.35
    characterMovement.maxWalkSpeed = 500
    characterMovement.minAnalogWalkSpeed = 20
    characterMovement.brakingDecelerationWalking = 2000
    characterMovement.bOrientRotationToMovement = true
    cameraBoom.targetArmLength = 400
    cameraBoom.busePawnControlRotation = true
    followCamera.bUsePawnControlRotation = true
  
  ufuncs:
    proc setupPlayerInputComponent(playerInputComponent : UInputComponentPtr) =  #Notice here we are overriding a native cpp virtual func. You can call `super` self.super(playerInputComponent) or super(self, playerInputComponent)
      let pc = ueCast[APlayerController](self.getController())
      if pc.isNotNil():
        let inputComponent = ueCast[UEnhancedInputComponent](playerInputComponent)
        let subsystem = getSubsystem[UEnhancedInputLocalPlayerSubsystem](pc).get()
        subsystem.addMappingContext(self.defaultMappingContext, 0)
        inputComponent.bindAction(self.jumpAction, ETriggerEvent.Triggered, self, n"jump")
        inputComponent.bindAction(self.jumpAction, ETriggerEvent.Completed, self, n"stopJumping")
        inputComponent.bindAction(self.moveAction, ETriggerEvent.Triggered, self, n"move")
        inputComponent.bindAction(self.lookAction, ETriggerEvent.Triggered, self, n"look")

    proc move(value: FInputActionValue) = 
      let 
        movementVector = value.axis2D()
        rot = self.getControlRotation()
        rightDir = FRotator(roll: rot.roll, yaw: rot.yaw).getRightVector()
        forwardDir = FRotator(yaw: rot.yaw).getForwardVector()
      self.addMovementInput(rightDir, movementVector.x, false) 
      self.addMovementInput(forwardDir, movementVector.y, false) 

    proc look(value: FInputActionValue) =
      let lookAxis = value.axis2D()
      self.addControllerYawInput(lookAxis.x)
      self.addControllerPitchInput(lookAxis.y)

uClass ANimGameMode of AGameModeBase:
  proc constructor(init:FObjectInitializer) = #Similar to default but allows you to write full nim code
    let classFinder = makeClassFinder[ACharacter]("/Game/ThirdPerson/Blueprints/BP_ThirdPersonCharacter")
    self.defaultPawnClass = classFinder.class
```

This code can be found at `src/examples/actorexample`. There are more examples inside that folder. You can do `import examples/example` in from Game.nim (see the NimTemplate) to play with it.

```nim
#Nim UClasses can derive from the same classes that blueprints can derive from.

uClass AExampleActor of AActor:
    (BlueprintType, Blueprintable) #Class specifiers follow the C++ convention. 
    uprops(EditAnywhere, BlueprintReadWrite): #you can declare multiple UPROPERTIES in one block
        exampleValue : FString #They are declare as nim properties. 
        anotherVale : int #notice int in nim is int64. while in c++ it is int32.
        anotherValueInt32 : int32 #this would be equivalent to int32
        predValue : FString = "Hello" #you can assign a default value to a property.
        predValueInt : int =  20 + 10 #you can even use functions (the execution is deferred)
        nameTest : FString = self.getName() #you can even use functions within the actor itself. It is accessible via this or self.

#In general when using the equal symbol in a uClass declaration, a default constructor will be generated.
#you can specify a custom constructor if you want to by defining a regular nim function and adding the pragma uconstructor

proc myExampleActorCostructor(self: AExampleActorPtr, initializer: FObjectInitializer) {.uConstructor.} =
    UE_Log "The constructor is called for the actor"
    self.anotherVale = 5
    #you can override the values set by the default constructor too since they are added adhoc before this constructor is called.
    self.predValue = "Hello World"

#Notice that you rarelly will need to define a custom constructor for your class. Since the CDO can be set within the DSL. 

#UFunctions

#UFunctions can be added by adding the pragma uFunc, and for each meata, another pragma:
#Since in nim functions are separated from the type they are declared in, you need to specify the type as the first argument.

proc myUFunction(self: AExampleActorPtr, param : FString) : int32 {. ufunc, BlueprintCallable .} = 
    UE_Log "UFunction called"
    5

#You can also use the uFunctions macro to declare multiple uFunctions at once. The preferred way is still to use them in an uClass block like shown above.
uFunctions:
    (BlueprintCallable, self:AExampleActorPtr) #you must specify the type and any shared meta like this.

    proc anotherUFunction(param : FString) : int32 = 10 #now you can define the function as you normally would.
    proc yetAnotherUFunction(param : FString) : FString = 
        self.getName() #you can access to the actor itself by the name you specify in the uFunctions macro.
    
    proc customPragma(param : FString) : int32 {. BlueprintPure .} = 10 #you can also specify custom pragmas per functions rather than creating a new block

    proc callFromTheEditor() {. CallInEditor .} = 
        UE_Log "Call from the editor"
        
```
Which produces:
![Blueprint](https://media.discordapp.net/attachments/844939530913054752/1004338096160120913/unknown.png)
