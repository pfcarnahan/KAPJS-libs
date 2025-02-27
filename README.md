# ButtonEngine.js Documentation

## Overview
ButtonEngine.js is a module designed to simplify the creation and management of interactive buttons in KAPJS. It provides:

- A `Button` constructor for creating button instances with customizable properties.
- Methods for rendering, handling mouse interactions, and managing button states.
- A templating system for applying default configurations to buttons.
- Automatic hooks for scene transitions when used with my other modules.

## Importing

You can just copy the module into the top of the code to import it.

## Usage

### Basic Setup

To use the Button engine, you need to include it in your project and initialize it:

```javascript
// ... all other code ...

Button.engine.init();
```
**NOTE**: When using with my other modules, you need to `init()` them in the right order. See the main README for more information.

### Creating a Button

```javascript
var button = new Button({
    x: 100,
    y: 100,
    w: 150,
    h: 50,
    text: "Click Me",
    onClick: function() { console.log("Button clicked!"); }
});
```

### Adding a Button to the Engine

```javascript
Button.add(button);
```

You can also just add the button directly without assigning it to a variable:

```javascript
Button.add(new Button({
    x: 100,
    y: 100,
    w: 150,
    h: 50,
    text: "Click Me",
    onClick: function() { console.log("Button clicked!"); }
}));
```

### Methods

- **draw()**: Renders the button.
- **run()**: Handles the button's behavior when the mouse is over it.
- **testMouse()**: Checks if the mouse is over the button.
- **tryClick()**: Processes click events on the button.
- **update()**: Updates the button's state and renders if necessary.

These methods are automatically called by the engine, so you don't need to manually call them most of the time, if ever.

### Static Methods

- **Button.add(button)**: Adds a button to the engine with default template configurations.
- **Button.engine.init()**: Initializes the button engine, adding to the `mouseReleased` and `draw` functions to handle button interactions.

### Button Properties

Here are the user-definable properties for buttons in the Button Engine:

- **x**: X-coordinate of the button, defaults to the center of the canvas (`width / 2`).
- **y**: Y-coordinate of the button, defaults to the center of the canvas (`height / 2`).
- **w**: Width of the button, defaults to 100 pixels.
- **h**: Height of the button, defaults to 50 pixels.
- **img**: Image for the button, defaults to no image (`false`).
- **backColor**: Background color of the button, defaults to black (`color(0)`).
- **drawRect**: Whether to draw the rectangle, defaults to `true` unless an image is provided.
- **round**: Corner rounding radius for the button, defaults to 0 for sharp corners.
- **stroke**: Stroke color, defaults to transparent white (`color(255, 0)`).
- **strokeWeight**: Stroke weight, defaults to 1 pixel.
- **color**: Text color, defaults to white (`color(255)`).
- **text**: Text on the button, defaults to an empty string (`""`).
- **textSize**: Size of the text, defaults to 12 pixels.
- **growAmount**: Growth factor for button when hovered, defaults to 1.1 times the normal size.
- **grow**: Current growth state, starts at 1 (normal size).
- **cursor**: Cursor type when hovering over the button, defaults to 'pointer'.
- **enabled**: Whether the button is interactive, defaults to `true`.
- **enable**: Function to call when enabling the button, defaults to an empty function.
- **disable**: Function to call when disabling the button, defaults to an empty function.
- **shouldRender**: Function to determine if the button should be rendered, defaults to always `true`.
- **visible**: Visibility state of the button, defaults to `true`.
- **onClick**: Function to execute when the button is clicked, defaults to an empty function.
- **interceptMouse**: Whether to intercept mouse events, defaults to `true`.
- **scene**: Indicates if the button is part of a scene, defaults to `false`.
- **sceneTo**: Name of the scene to transition to when clicked, defaults to `false`.

### Template Configuration

Use `Button.Template` for setting up button configurations:

```javascript
var redTemplate = new Button.Template({
    backColor: color(255, 0, 0), // Red background
    textSize: 20,
    // ... other default configurations
});
```

### Example

```javascript
var startButton = new Button({
    text: "Start",
    onClick: function() {
        console.log("Starting!");
    }
});
redTemplate.add(startButton);
// The button will be red, with a textSize of 20.
```

## Notes

- The module uses a closure to encapsulate the `Button` functionality.
- `nullish` is a utility function mimicking the nullish coalescing operator for compatibility with older JavaScript environments.
- The `Button.engine` object modifies the `mouseReleased` and `draw` functions to manage button interactions.
- The scene changing behaviour will only work with my scene manager. If you are using another scene manager, you may need to modify the code accordingly.
- Every function in the button properties will be bound to that button. This is done so that 'this' refers to the button instance when these methods are called.
- Image buttons must be created after the image is loaded.