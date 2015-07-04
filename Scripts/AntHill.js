var AntColony = (function (AntColony) {
    "use strict";
    function createAntHill(x, y) {
        var ants = [],
            that = AntColony.createEntity(x, y, "Images/AntHill.png", 50, 50),
            superRender = that.render;

        (function () {
            var a, aMax, antX, antY;
            for (a = 0, aMax = 50; a < aMax; a++) {
                antX = x + ((Math.random() - Math.random()) * 300);
                antY = y + ((Math.random() - Math.random()) * 300);
                ants.push(AntColony.createAnt(antX, antY, that));
            }
        }());

        //region Public Methods and Reveals
        that.update = function (foodManager, pheromoneManager) {
	        for (var a = 0, al = ants.length; a < al; a++) {
		        ants[a].update(foodManager, pheromoneManager);
	        }
        };

        that.render = function(context){
            superRender.call(that, context);

	        for (var a = 0, al = ants.length; a < al; a++) {
		        ants[a].render(context);
	        }
        };

        that.ants = ants;
        //endregion

        return that;
    }

    AntColony.createAntHill = createAntHill;

    return AntColony;
}(AntColony || {}));