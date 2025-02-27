# Scene Manager Documentation

The `SceneManager.js` provides a utility for managing different scenes in KAPJS.

## Overview

The `SceneManager.js` provides a utility for managing different scenes in KAPJS. It allows you to easily switch between scenes, and draw them without having to write a lot of code. It also provides a way for you to draw your scene without having to write a lot of code, and it allows you to easily switch between scenes.

## Importing

You can put the library at the top of your code.

## Usage

### Setup

```javascript
// ... all other code ...

Scene.init('startScene', true, false);
```

**NOTE**: If you are using my other libraries, you will have to `init()` them in the right order. See the main README for more information.

- **startScene**: The name of the initial scene to load.
- **before**: If `true`, the scene will be drawn before the original `draw` function; if `false`, after.
- **usingMyButtons**: A flag to indicate if you are using my buttons with this library.

### Adding Scenes

Add new scenes using the `addScene` method:

```javascript
Scene.addScene('game', function() {
    background(200);
    // Your game logic here
});
```

### Scene Switching

To switch scenes:

```javascript
Scene.swapScene('newSceneName');
```

### Scene Drawing

The Scene Manager will automatically call the appropriate scene function during the `draw` loop:

```javascript
function draw() {
    // Scene Manager will handle this internally
    // No need to call `Scene.drawScene()`
}
```

## Key Features

- **Scene Swapping**: Easily change the current scene with `swapScene`.
- **Scene Visibility**: If `usingMyButtons` is set to `true`, buttons can be associated with scenes to toggle their visibility.
- **Error Handling**: Stops the `draw` loop if an error occurs during scene rendering.
- **Scene Management**: Keeps track of all scenes in the `scenes` object.

## API

- **init(startScene, before, usingMyButtons)**: Initialize the Scene Manager.
- **addScene(name, drawFunction)**: Add a new scene.
- **swapScene(newScene)**: Switch to a new scene.
- **drawScene()**: Draw the current scene (called internally).
- **before**: Property to determine if scenes should be drawn before or after the original `draw` function.
- **scenes**: Object containing all scene functions.

## Limitations

- The Scene Manager assumes the use of KAPJS. For different environments, modifications might be necessary.
- Scene functions are expected to handle their own setup and cleanup.

## Notes
- The module uses a closure to encapsulate the `Scene` functionality.
- `nullish` is a utility function mimicking the nullish coalescing operator for compatibility with older JavaScript environments.
- As long as you `init()` it in the right place, it will update the `draw` function to draw the scenes.
- It will interface with my Button Engine if you use it. If not, you can add your own button functionality.