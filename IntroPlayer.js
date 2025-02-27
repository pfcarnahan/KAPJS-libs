var IntroPlayer = (function() {
    // Create an IntroPlayer object to encapsulate all necessary data and methods
    var IntroPlayer = {
        // Properties to hold original functions, which will be set during init
        oldDraw: null,
        oldFC: null,
        oldKP: null,
        oldMP: null,
        
        // Flag to indicate if the intro should be skipped
        shouldSkip: false,

        /**
         * Initialize the intro sequence with the provided function.
         * Saves the current state of global functions at the time of initialization.
         * @param {Function} introFunction - The function to run during the intro. When this function returns true, the intro will end.
         */
        init: function(introFunction) {
            // Save the current state of global functions
            this.oldDraw = draw;
            this.oldFC = frameCount;
            this.oldKP = keyPressed;
            this.oldMP = mousePressed;

            // Reset shouldSkip flag
            this.shouldSkip = false;

            // Override default mouse and keyboard events to allow skipping the intro
            mousePressed = keyPressed = function() {
                IntroPlayer.shouldSkip = true;
            };

            // Override the draw function to control the intro sequence
            draw = function() {
                // Check if the intro function completes or if the user wants to skip
                if(introFunction() || IntroPlayer.shouldSkip) {
                    // Restore original functions and settings
                    draw = IntroPlayer.oldDraw;
                    frameCount = IntroPlayer.oldFC;
                    keyPressed = IntroPlayer.oldKP;
                    mousePressed = IntroPlayer.oldMP;
                }
            };
        }
    };

    // Return the IntroPlayer object, making its methods and properties accessible outside the IIFE
    return IntroPlayer;
})();