---
title: Hot reloading
description: Reload changes to your Nim code in Unreal Engine while the editor is running.
---

## Common issues

- Meta tags don't get updated during hot reload. They aren’t taken into account in the diff for the hot reload to trigger. You can add the `Reinstance` tag to the class to force an update or simply restart the editor.