var Scene = (function() {
    // Utility function to mimic nullish coalescing operator
    var nullish = (function() {return this;}())[["Function"]]("a", "b", "return a ?? b;");

    var Scene = {
        scene: "", // Current scene

        // Method to swap the current scene
        swapScene: function(newScene) {
            // Test for the button engine
            if(this.usingMyButtons) {
                var b = (function() {return this[["Button"]];})();
                if (nullish(b, false)) {
                    b.buttons.forEach(function(button) {
                        if (button.scene) {
                            button.visible = (button.scene === newScene);
                        }
                    });
                }
            }
            this.scene = newScene; // Swap the scene
        },

        // Helper function to add scenes
        addScene: function(name, drawFunction) {
            this.scenes[name] = drawFunction;
        },

        // Draw the current scene
        drawScene: function() {
            try {
                this.scenes[this.scene]();
            } catch(e) {
                noLoop(); // Stop looping if error
                throw e;
            }
        },

        // Object to hold all scenes
        scenes: {},

        // Placeholder for the old draw function
        oldDraw: function() {},

        // Helper for the engine to know if the scene should be drawn before or after the old draw
        before: true,

        // Initialize the Scene Manager
        init: function(startScene, before, usingMyButtons) {
            this.oldDraw = draw; // Save the old draw function
            this.before = before || false; // Set whether to draw before or after
            this.usingMyButtons = usingMyButtons || false;

            this.swapScene(startScene); // Initialize with the start scene

            draw = function() {
                if (Scene.before) {
                    Scene.oldDraw();
                }
                Scene.drawScene();
                if (!Scene.before) {
                    Scene.oldDraw();
                }
            };
        }
    };

    // Globalize the Scene Manager
    (function() {return this;}())[["Scene"]] = Scene;

    return Scene;
})();