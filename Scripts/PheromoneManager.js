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
	        foodPheromones.forEach(p => p.update());
            removeEvaporatedPheromones();
        };

        return that;
    }

    AntColony.createPheromoneManager = createPheromoneManager;

    return AntColony;
}(AntColony || {}));

/*var AntColony = (function (AntColony) {
 "use strict";
 function PheromoneManager() {
 this.pheromones = [];
 this.pheromoneDispersion = 6;
 }

 PheromoneManager.prototype.update = function () {
 this.pheromones.forEach(p => p.update());
 this.removeEvaporatedPheromones();
 };

 PheromoneManager.prototype.removeEvaporatedPheromones = function(){
 for(var p = 0, l = this.pheromones.length; p < l; p++){
 if (this.pheromones[p].getStrength() < 0) {
 this.pheromones.splice(p, 1);
 p--;
 l--;
 }
 }
 };

 PheromoneManager.prototype.addPheromone = function(pos, dir){
 var newPheromone = AntColony.createPheromone(pos.x, pos.y, dir.x, dir.y);

 for(var p = 0, l = this.pheromones.length; p < l; p++){
 if (AntColony.Vector.prototype.withinDistance(this.pheromones[p].position,
 newPheromone.position, this.pheromoneDispersion))
 {
 this.pheromones[p].combine(newPheromone);
 return;
 }
 }

 this.pheromones.push(newPheromone);
 };

 PheromoneManager.prototype.getPheromoneDirection = function(pos, range){
 var pheromoneDirections = [];

 for(var p = 0, l = this.pheromones.length; p < l; p++){
 if (AntColony.Vector.prototype.withinDistance(this.pheromones[p].position,
 pos, range))
 {
 pheromoneDirections.push(this.pheromones[p].direction);
 }
 }

 if (pheromoneDirections.length > 0 ){
 return AntColony.Vector.prototype.average(pheromoneDirections);
 }

 return new AntColony.Vector(0, 0);
 };

 AntColony.PheromoneManager = PheromoneManager;

 return AntColony;
 }(AntColony || {}));*/}(AntColony || {}));