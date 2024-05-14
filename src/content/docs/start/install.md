---
title: Installing NimForUE
description: How to install NimForUE.
---

## Two ways to install NimForUE

1. **Using NimForUE template**: This is the recommended way to install NimForUE. It will install NimForUE and all of its dependencies. You can then use NimForUE to create a new project.
2. **Adding NimForUE to an existing project**: If you already have a project and want to add NimForUE to it, you can do so by adding NimForUE as a plugin.

## Using NimForUE template

NimForUE is Nim plugin for UE5 that provides native performance, hot reloading, and full interop between C++ and Blueprints. With this plugin, you can extend any UE class in Nim and then further extend it in Blueprint without restarting the editor. This allows for seamless integration with common UE workflows, allowing you to take advantage of the power of Nim in your UE projects.

Make sure you have Unreal Engine 5.2 installed and you are using Nim devel (`choosenim devel`)

1. Clone the repository and its submodules:
    ```
    git clone https://github.com/jmgomez/NimTemplate.git --recurse-submodules
    ```
2. Navigate to the NimForUE directory:
    ```
    cd NimTemplate/Plugins/NimForUE
    ```
3. Set up `nue`, the NimForUE build tool using nimble: `nimble nue`

4. Setup NimForUE by running `./nue setup`. This will build the project and all the necessary Nim files.

5. Open NimTemplate.uproject (or run `./nue starteditor`)

5. Click play, click into the viewport to control the character. You're all set!

## Adding NimForUE to an existing project

1. Make sure you have Nim installed. The required version is `devel` as NimForUE uses some features that are not yet in the stable version.
1. Clone the repo inside `YourGame/Plugins`
1. Run `nimble nuesetup` from `YourGame/Plugins/NimForUE`
