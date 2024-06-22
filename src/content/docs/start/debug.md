---
title: Debugging
description: Tips on debugging
---

By default `nue` builds your game in release mode which strips symbols away from the binaries. This is what you want most of the time, but for debug purposes you should build using `nue game --debug`. This way you'll retain meaningful stack traces whenever errors happen.
