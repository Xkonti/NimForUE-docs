---
title: Introducing to NimForUE
description: Get started using Nim for Unreal Engine.
---

## Why NimForUE?

The core idea is to have a short feedback loop while having native performance and a modern language that can access all features Unreal provides.

The plugin outputs native dynamic libraries (DLLs) that are hooked into UnrealEngine for development. When releasing the code is statically linked as published as an Unreal native plugin. This approach make the plugin portable and fast. It can run on any platform that Unreal supports (not all tested).

The design philosophy is to not change any unreal conventions on the API side of things, so anyone that knows Unreal can reuse its knowledge. The code guidelines follow (for the most part) the Nim conventions when not in contradiction with the Unreal ones.

If you have any question or wants to know more and follow the updates:

[Join us on the Discord group](https://discord.gg/smD8vZxzHh)

If you dont have Discord, you can also reach out at:

[Twitter](https://twitter.com/_jmgomez_)

## Why Nim?


Nim is fast and easy to read with a good type system and a fantastic macro system, and it also has the best C++ interop in the industry.

The compiler is incredibly fast, and it's about to get faster with incremental compilation on the works.

The performance is the same as with C++ because you are outputting optimized C++ with zero overhead.

Fully control the memory if you so desire (including move semantics).

Nim Type System has everything (and probably more) that you can expect from a typed lang: generics, sum types, constraints on those, and it even has C++-like concepts (my personal favorite feature from C++) it even has hints of dependent types.

The macro system is outstanding. Just to give you an idea, await/async are implemented as a library. The same applies to Pattern Matching. This means (as you will see below) that you can create *typed* DSLs for your Unreal Projects that use the semantics that better fit your project.

Nim compile time capabilities are so good that we were able to rebuild UHT (Unreal Header Tool) at Nim's compile time.

The C++ interoperability makes this plugin stand out from the rest as you can consume any native API and implement virtual functions which is the way that Unreal extends most engine APIs.