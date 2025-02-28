# IntroPlayer.js

A utility for managing introductory sequences in KAPJS programs.

## Overview

`IntroPlayer.js` provides a simple way to implement an intro sequence in your program. It allows you to define a custom function that will run during the intro, and provides an easy way for users to skip the intro if desired.

## Importing

Just put the contents of the `IntroPlayer.js` file at the top of your code.

## Usage

To use `IntroPlayer.js`, include it in your KAPJS project and initialize it with your intro function.

**NOTE**: When using this library with my other KAPJS libraries, you need to `init()` them in the right order. See the main README for details.

### Method

The intro player saves the old `draw`, `frameCount`, `mousePressed`, and `keyPressed` variables. It then replaces them with new functionality that will run your intro function and then restore the old variables.

### Example

```javascript
// ... all other code ...

IntroPlayer.init(function() {
  // Intro sequence goes here.
  // When it is complete, just return true from the function.
});
```