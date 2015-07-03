var AntColony = (function (AntColony) {
    "use strict";
    function createPheromone(x, y, dirx, diry) {
        var position = new AntColony.Vector(x, y),
            direction = new AntColony.Vector(dirx, diry),
            strength = 100,
            decayRate = 0.05,
            that = {};

        //region Public Methods and Reveals
        that.update = function () {
            strength -= decayRate;
        };

        that.combine = function (other) {
            if (!(other.hasOwnProperty("position") &&
                other.hasOwnProperty("direction") &&
                other.hasOwnProperty("getStrength"))) {
                throw new Error("The other object does not have the required properties");
            }

            var avgPos = AntColony.Vector.average([position, other.position]),
                avgDir = AntColony.Vector.average([direction, other.direction]),
                newStrength = strength + other.getStrength();
            newStrength = (newStrength > 100) ? 100 : newStrength;

            position = avgPos;
            direction = avgDir;
            strength = newStrength;
        };

        that.getStrength = function () { return strength; };

        that.position = position;
        that.direction = direction;
        //endregion

        return that;
    }

    AntColony.createPheromone = createPheromone;

    return AntColony;
}(AntColony || {}));
