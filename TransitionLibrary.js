var Transition = (function() {
    // Create a nullish coalescing operator equivalent for environments without it
    var nullish = (function() {return this;}())[["Function"]]("a","b","return a ?? b;");
    
    /**
     * Constructor for the Transition class.
     * Initializes the transition with provided configuration or default values.
     * @param {Object} config - Configuration object for the transition.
     * @param {Function} [config.drawFunction] - Custom draw function for the transition.
     * @param {Function} [config.callback] - Function to be called when the transition ends.
     * @param {Object} [config.obj] - Additional data or object associated with the transition.
     * @param {Boolean} [config.enableSkipping] - Whether the transition can be skipped.
     * @param {Boolean} [config.drawAnyway] - Whether to execute the original draw function during transition.
     * @param {Function} [config.onStart] - Function to be called when the transition starts.
     */
    var Transition = function(config) {
        // Use default values if config properties are not provided
        config = nullish(config, {});

        // Bind methods to 'this' for proper context
        this.drawFunction = nullish(config.drawFunction, function() {}).bind(this);
        this.callback = nullish(config.callback, function() {}).bind(this);
        this.obj = nullish(config.obj, {});
        this.skipping = nullish(config.enableSkipping, false);
        this.drawAnyway = nullish(config.drawAnyway, false);
        this.onStart = nullish(config.onStart, function() {}).bind(this);

        this.shouldSkip = false; // Flag to control whether the transition should be skipped

        // Store original functions for later restoration
        this.oldDraw = function() {};
        this.oldFrameCount = 0;
        this.oldMousePressed = this.oldMouseReleased = this.oldMouseClicked = this.oldKeyPressed = this.oldKeyReleased = function() {};
    };

    /**
     * Starts the transition by setting up all necessary event handlers and initiating the draw function.
     */
    Transition.prototype.start = function() {
        // Save current global functions
        this.oldMousePressed = mousePressed;
        this.oldMouseReleased = mouseReleased;
        this.oldMouseClicked = mouseClicked;
        this.oldKeyPressed = keyPressed;
        this.oldKeyReleased = keyReleased;
        this.oldFrameCount = frameCount;
        this.oldDraw = draw;

        // Override event handlers to allow skipping if enabled
        mousePressed = mouseReleased = mouseClicked = keyPressed = keyReleased = (this.skipping ? function() { this.end(); }.bind(this) : function() {});

        // Reset frame count
        frameCount = 0;
        
        // Call the onStart function
        this.onStart();

        // Reset the shouldSkip flag for a new transition
        this.shouldSkip = false;

        var _this = this; // '_this' is used to maintain the correct context within the new draw function
        draw = function() {
            if (_this.drawAnyway) {
                _this.oldDraw(); // Execute the old draw function if required
            }
            
            _this.drawFunction(); // Execute the transition's draw function

            if (_this.shouldSkip) { // Check if the transition should end
                _this.callback(); // Execute the callback function

                // Restore all original functions
                mousePressed = _this.oldMousePressed;
                mouseReleased = _this.oldMouseReleased;
                mouseClicked = _this.oldMouseClicked;
                keyPressed = _this.oldKeyPressed;
                keyReleased = _this.oldKeyReleased;
                frameCount = _this.oldFrameCount;
                draw = _this.oldDraw;
            }
        };
    };

    /**
     * Ends the current transition by setting the shouldSkip flag to true.
     */
    Transition.prototype.end = function() {
        this.shouldSkip = true;
    };

    return Transition;
})();