var AntColony = (function (AntColony) {
    "use strict";
    function createFoodManager(foodCount, canvasWidth, canvasHeight) {
        var food = [],
            that = {};

        (function setup() {
            for (var i = 0, max = foodCount; i < max; i++) {
				food.push(AntColony.createFood(Math.random() * canvasWidth,
												Math.random() * canvasHeight));
			}
		}());

		that.update = function () {
			for (var f = 0, fl = food.length; f < fl; f++) {
				food[f].update(canvasWidth, canvasHeight);
			}
		};

		that.render = function (context) {
			for (var f = 0, fl = food.length; f < fl; f++) {
				food[f].render(context);
			}
		};

	    that.closestFood = function (pos) {
		    var closestFoodItem = food[0],
			    closestDistance = AntColony.Vector.squaredDistanceBetween(pos,
				    closestFoodItem.position),
			    tempDistance = closestDistance,
			    i,
			    l;

		    for (i = 1, l = food.length; i < l; i++) {
			    tempDistance = AntColony.Vector.squaredDistanceBetween(pos,
				    food[i].position);
			    if (tempDistance < closestDistance) {
				    closestFoodItem = food[i];
				    closestDistance = tempDistance;
			    }
		    }

		    return closestFoodItem;
	    };

	    return that;
	}

	AntColony.createFoodManager = createFoodManager;

	return AntColony;
}(AntColony || {}));