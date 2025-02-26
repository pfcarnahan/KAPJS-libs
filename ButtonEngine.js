var Button = (function() {
    // Utility function to mimic nullish coalescing operator
    var nullish = (function() {return this;}())[["Function"]]("a", "b", "return a ?? b;");

    // Constructor
    var Button = function(config) {
        config = nullish(config, {});
        var ks = Object.keys(config);
        for(var i = 0; i < ks.length; i++) {
            this[ks[i]] = nullish(this[ks[i]], config[ks[i]]);
        }
    };

    Button.prototype = {
        constructor: Button,

        // Draw method for rendering the button
        draw: function() {
            pushStyle();
            rectMode(CENTER);
            imageMode(CENTER);
            textAlign(CENTER, CENTER);

            pushMatrix();
            translate(this.x, this.y);
            scale(this.grow);

            if (this.drawRect) {
                fill(this.backColor);
                if (nullish(this.stroke, false)) {
                    stroke(this.stroke);
                    strokeWeight(this.strokeWeight);
                } else {
                    noStroke();
                }
                rect(0, 0, this.w, this.h, this.round);
            }
            if (nullish(this.img, false)) {
                image(this.img, 0, 0, this.w, this.h);
            }

            fill(this.color);
            textSize(this.textSize);
            text(this.text, 0, 0);
            popMatrix();
            popStyle();
        },

        // Method to handle button behavior when mouse is over it
        run: function() {
            if (this.enabled && this.visible) {
                if (this.testMouse()) {
                    this.grow = lerp(1, this.growAmount, this.grow/this.growAmount);
                    cursor(this.cursor);
                    Button.engine.buttonSetCursor = true;
                } else {
                    this.grow = lerp(this.growAmount, 1, this.grow/this.growAmount);
                }
            } else {
                this.grow = 1;
            }
        },

        // Check if the mouse is over the button
        testMouse: function() {
            return (mouseX >= (this.x - (this.w/2 * this.grow))) &&
                   (mouseX <= (this.x + (this.w/2 * this.grow))) &&
                   (mouseY >= (this.y - (this.h/2 * this.grow))) &&
                   (mouseY <= (this.y + (this.h/2 * this.grow)));
        },

        // Handle click events
        tryClick: function() {
            if (this.enabled && this.testMouse() && this.visible) {
                this.onClick();
                if (this.sceneTo) {
                    var Scene = (function() {return this;})()[["Scene"]];
                    if (Scene) {
                        Scene.swapScene(this.sceneTo);
                    }
                }
                return this.interceptMouse;
            }
            return false;
        },

        // Update method to refresh button state and render if needed
        update: function() {
            if (this.shouldRender() && this.visible) {
                this.draw();
            }
            this.run();
        }
    };

    // Static methods
    Button.add = function(button) {
        Button.Template.DEFAULT.add(button);
    };

    Button.buttons = [];
    Button.engine = {
        buttonSetCursor: false,
        init: function() {
            var oldMouseReleased = mouseReleased || function(){};
            mouseReleased = function() {
                var intercepted = false;
                for (var i = 0; i < Button.buttons.length; i++) {
                    intercepted = intercepted || Button.buttons[i].tryClick();
                }
                if (!intercepted) {
                    oldMouseReleased();
                }
            };

            var oldDraw = draw;
            draw = function() {
                if (Button.engine.buttonSetCursor) {
                    cursor("");
                }
                Button.engine.buttonSetCursor = false;
                oldDraw();
                for (var i = 0; i < Button.buttons.length; i++) {
                    Button.buttons[i].update();
                }
            };
        }
    };

    // Template for button configurations
    Button.Template = function(config) {
        config = nullish(config, {});
        this.config = {
            x: nullish(config.x, width/2),
            y: nullish(config.y, height/2),
            w: nullish(config.w, 100),
            h: nullish(config.h, 50), // Size and position.
            
            img: nullish(config.img, false), // Image if exists.
            
            backColor: nullish(config.backColor, color(0)),
            drawRect: nullish(config.drawRect, (nullish(this.img, false) ? false : true)),
            round: nullish(config.round, 0),
            stroke: nullish(config.stroke, color(255, 0)),
            strokeWeight: nullish(config.strokeWeight, 1), // Rectangle stuff.
            
            color: nullish(config.color, color(255)),
            text: nullish(config.text, ""),
            textSize: nullish(config.textSize, 12), // Text stuff.
            
            growAmount: nullish(config.growAmount, 1.1),
            grow: 1, // Grow stuff. growAmount controls the size multiplier of the button.
            
            cursor: nullish(config.cursor, "pointer"), // What the cursor will be when you hover over the button.
            
            enabled: nullish(config.enabled, true),
            enable: nullish(config.enable, function() {}),
            disable: nullish(config.disable, function() {}), // Is it enabled? Functions that you can define so that you can grey out the button or something. Will bind to the button so that you can use 'this.'
            
            shouldRender: nullish(config.shouldRender, function() {return true;}),
            visible: nullish(config.visible, true), // User defined shouldRender, and visible. Bound to the button so you can use 'this.'
            
            onClick: nullish(config.onClick, function() {}),
            interceptMouse: nullish(config.interceptMouse, true), // Click stuff. interceptMouse is explained in part 2. onClick is bound to the button so you can use 'this.'
            
            scene: nullish(config.scene, false),
            sceneTo: nullish(config.sceneTo, false) // Scene stuff. You will have to define behavior if not using my scene manager.
        };
    };

    Button.Template.prototype = {
        applyTemplate: function(button) {
            var keys = Object.keys(this.config);
            for (var i = 0; i < keys.length; i++) {
                button[keys[i]] = nullish(button[keys[i]], this.config[keys[i]]);
                if (typeof button[keys[i]] === "function") {
                    button[keys[i]] = button[keys[i]].bind(button);
                }
            }
            return button;
        },
        add: function(button) {
            Button.buttons.push(this.applyTemplate(button));
        }
    };

    Button.Template.DEFAULT = new Button.Template({});

    // Globalize Button for external access
    (function() {return this;})()[["Button"]] = Button;

    return Button;
})();
