# SpriteLoader.js

A utility for loading and managing sprites in KAPJS, particularly useful for games or graphical applications where sprites need to be dynamically loaded and displayed.

## Overview

SpriteLoader.js provides:
- Asynchronous sprite loading with progress tracking.
- Support for both pixel art and custom drawn sprites.
- Integration with existing drawing loops.

## Importing

Put the SpriteLoader.js file at the top of your KAPJS project.

## Usage

### Initialization

To start loading sprites:

```javascript
// ... all other code ...
SpriteLoader.init(sourceObject, targetObject, optionalCallback);
```

**sourceObject** is an object containing the sprites. Each should be an object like the examples below.

**targetObject** is the object where you want to store the loaded sprites. It should be an object.

**optionalCallback** is an optional callback function that will be called when all sprites are loaded.

**NOTE**: When using with my other modules, you need to init() them in the right order. See the main README for more information.

### Sprite Definition

Sprites can be defined in two ways:

**Pixel Art:**

```javascript
{
    "spriteName": {
        w: 16,  // Width of each pixel
        h: 16,  // Height of each pixel
        b: [
            "0000",
            "0110",
            "0110",
            "0000"
        ],
        p: {
            "0": color(0,0,0),
            "1": color(255,255,255)
        }
    }
}
```

**Custom Drawing:**

```javascript
{
    "spriteName": {
        w: 100,
        h: 100,
        d: function() {
            // Custom draw code here
        }
    }
}
```

### Loading Loop

The library automatically overrides the `draw()` function to show loading progress.

Once loading is complete, it restores the original `draw()` function and executes any provided callback.