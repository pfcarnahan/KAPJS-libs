var SpriteLoader = (function() {
    // Utility function to mimic nullish coalescing operator
    var nullish = (function() {return this;}())[["Function"]]("a", "b", "return a ?? b;");

    var SpriteLoader = {
        oldDraw: null,
        oldFC: null,
        index: 0,
        keys: null,
        values: null,
        spriteObj: null,
        targetObj: null,
        callback: null,
        
        // Method to draw sprites and show loading progress
        drawLoop: function() {
            background(0, 0); // Set background to transparency

            if (nullish(SpriteLoader.values[SpriteLoader.index], false)) {
                var sprite = SpriteLoader.values[SpriteLoader.index];
                if (nullish(sprite.b, false)) { // If it's pixel art
                    for (var y = 0; y < sprite.b.length; y++) {
                        var row = sprite.b[y].split("");
                        for (var x = 0; x < row.length; x++) {
                            var colorKey = row[x];
                            fill(sprite.p[colorKey] || color(0, 0));
                            noStroke();
                            rectMode(CORNER);
                            rect(x * sprite.w, y * sprite.h, sprite.w, sprite.h);
                        }
                    }
                    var maxLength = Math.max.apply(0, sprite.b.map(function(e) {return e.length;}));
                    SpriteLoader.targetObj[SpriteLoader.keys[SpriteLoader.index]] = get(0, 0, maxLength * sprite.w || 1, sprite.b.length * sprite.h || 1);
                } else { // Otherwise, use custom draw function
                    (nullish(sprite.d, function(){})());
                    SpriteLoader.targetObj[SpriteLoader.keys[SpriteLoader.index]] = get(0, 0, sprite.w || 1, sprite.h || 1);
                }
            }
            
            SpriteLoader.index++; // Increment the index

            // Draw loading progress
            background(0); // Black background
            textSize(20);
            cursor("none");
            fill(255);
            textAlign(CENTER, CENTER);
            text("Loading... " + ((SpriteLoader.index/SpriteLoader.keys.length) * 100).toFixed(0) + "%", width/2, height/2);

            if (SpriteLoader.index >= SpriteLoader.values.length) { // If loading is done
                draw = SpriteLoader.oldDraw; // Reset the draw function
                frameCount = SpriteLoader.oldFC; // Reset frameCount
                nullish(SpriteLoader.callback, function() {})(); // Run the callback if it exists
            }
        },
        
        // Initialization method
        init: function(spriteObj, targetObj, callback) {
            SpriteLoader.spriteObj = spriteObj;
            SpriteLoader.targetObj = targetObj;
            SpriteLoader.callback = callback;

            SpriteLoader.oldDraw = draw; // Save the old draw function
            SpriteLoader.oldFC = frameCount; // Save the old frameCount
            
            SpriteLoader.keys = Object.keys(spriteObj); // Keys of the sprite object
            SpriteLoader.values = Object.values(spriteObj); // Values of the sprite object
            SpriteLoader.index = 0; // Reset loading index
            
            frameRate(0); // Set the frameRate to the fastest it will go
            draw = SpriteLoader.drawLoop; // Replace draw with the loading loop
        }
    };

    return SpriteLoader;
})();