var AntColony = (function (AntColony) {
    "use strict";
    function createPheromoneManager() {
        var foodPheromones = [],
	        homePheromones = [],
            pheromoneDispersion = 6,
            that = {};

        function removeEvaporatedPheromones() {
            var p, l;
            for (p = 0, l = foodPheromones.length; p < l; p++) {
                if (foodPheromones[p].getStrength() < 0) {
	                foodPheromones.splice(p, 1);
                    p--;
                    l--;
                }
            }
        }

        that.addPheromone = function (pos, dir, type) {
            var newPheromone = AntColony.createPheromone(pos.x, pos.y, dir.x, dir.y, type),
                p, //counter for pheromone index
	            l, //max length of pheromone list
	            pheromones; //the array of pheromones to add to

	        type = type || "food";

	        if (type === "food") {
		        pheromones = foodPheromones;
	        } else if (type === "home") {
		        pheromones = homePheromones;
	        }

	        for (p = 0, l = pheromones.length; p < l; p++) {
		        if (AntColony.Vector.withinDistance(pheromones[p].position,
				        newPheromone.position, pheromoneDispersion)) {
			        pheromones[p].combine(newPheromone);
			        return;
		        }
	        }

	        pheromones.push(newPheromone);
        };

        that.getPheromoneDirection = function (pos, range, type) {
            var pheromoneDirections = [],
	            pheromones,
	            p,
                l;

	        type = type || "food";

	        if (type === "food") {
		        pheromones = foodPheromones;
	        } else if (type === "home") {
		        pheromones = homePheromones;
	        }

            for (p = 0, l = pheromones.length; p < l; p++) {
                if (AntColony.Vector.withinDistance(pheromones[p].position,
                        pos, range)) {
                    pheromoneDirections.push(pheromones[p].direction);
                }
            }

            return AntColony.Vector.average(pheromoneDirections);
        };

        that.update = function () {
	        for (var p = 0, pl = foodPheromones.length; p < pl; p++) {
		        foodPheromones[p].update();
	        }
            removeEvaporatedPheromones();
        };

        return that;
    }

    AntColony.createPheromoneManager = createPheromoneManager;

    return AntColony;
}(AntColony || {}));
