var AntColony = (function (AntColony) {
    "use strict";
    function createFood(x, y) {
        var foodBits = 20,
            that = AntColony.createEntity(x, y, "Images/Food.png", 10, 10);

        //region Public Methods and Reveals
        that.takeFoodBit = function () {
            foodBits--;
        };
        that.update = function (canvasWidth, canvasHeight) {
            if (foodBits < 0) {
                that.position.x = Math.random() * canvasWidth;
                that.position.y = Math.random() * canvasHeight;
                foodBits = 20;
            }
        };
        //endregion

        return that;
    }

    AntColony.createFood = createFood;

    return AntColony;
}(AntColony || {}));
