# Transition Library

A JavaScript library for managing transitions in KAPJS.

## Overview

The `Transition` class allows for the creation and management of transitions with customizable draw functions.

## Importing

To import the Transition Library, include the contents of `TransitionLibrary.js` file in your project.

## Usage

To use the Transition Library, you must first create instances of the Transition class.

### Basic Example

```javascript
var transition = new Transition({
    drawFunction: function() {
        // Custom drawing logic for the transition
    },
    callback: function() {
        console.log("Transition completed");
    },
    enableSkipping: true,
    drawAnyway: false,
    onStart: function() {
        console.log("Transition started");
    }
});

transition.start(); // Start the transition
transition.end();   // End the transition prematurely if needed
```

### Constructor Parameters

- `config`: An object containing configuration options.
  - `drawFunction`: The replacement draw function to be called instead of the main one.
  - `callback`: A function that is automatically called when the transition ends.
  - `obj`: An object that can be associated with the transition for additional data.
  - `enableSkipping`: A boolean to enable or disable skipping the transition. It will automatically bind the necessary functions.
  - `drawAnyway`: A boolean to determine if the original draw function should be executed during the transition.
  - `onStart`: A function that is automatically called when the transition starts.

### Methods

- `start()`: Initiates the transition, overriding necessary event handlers and starting the draw cycle.
- `end()`: Ends the transition prematurely by setting a flag to skip the rest of the transition.

## Notes

- The library uses a nullish coalescing operator equivalent for environments without native support.
- Event handlers like `mousePressed`, `mouseReleased`, etc., are overridden during the transition to allow for skipping if enabled.
- The original `draw` function can be executed during the transition if `drawAnyway` is set to `true`.