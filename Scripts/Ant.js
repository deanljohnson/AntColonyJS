var AntColony = (function (AntColony) {
    "use strict";
    function createAnt(x, y, antHill) {
        var velocity = new AntColony.Vector(0, 0),
            maxSpeed = 1.2,
            steerer = new AntColony.Steerer(),
            holdingFood = false,
            smellRadius = 20,
            pickupRadius = 5,
            that = AntColony.createEntity(x, y, "Images/Ant.png", 14, 7);

        //region Private Methods
        function doReturnHomeBehavior(addPheromoneFunc) {
            if (AntColony.Vector.withinDistance(that.position, antHill.position, pickupRadius)) {
                holdingFood = false;
                return;
            }

            velocity.add(steerer.seek(that.position, antHill.position, velocity, maxSpeed));

            //Add a weak wander force so that our movement isn't
            //perfectly linear. Also we add a little randomness to pheromone direction
            var wanderForce = steerer.wander(velocity);
            velocity.add(wanderForce.multiply(0.5));

            //Direction for pheromone is opposite the Ant's velocity
            //it he is returning home
            //noinspection JSLint
            var pheromoneDir = new AntColony.Vector(velocity.x, velocity.y);
            pheromoneDir.multiply(-1);

	        addPheromoneFunc(that.position, pheromoneDir, "food");
        }
        function doFoodSearchBehavior(closestFoodItem, pheromoneDirectionFunc, addPheromoneFunc) {
            var distToFood = AntColony.Vector.distanceBetween(that.position, closestFoodItem.position);

            if (distToFood < pickupRadius) {
	            grabFood(closestFoodItem);
            } else if (distToFood < smellRadius) {
	            approachFood(closestFoodItem, addPheromoneFunc);
            } else {
	            followPheromoneOrWander(pheromoneDirectionFunc);
            }
        }
        function setVelocity(closestFoodItem, pheromoneManager) {
            if (holdingFood) {
                doReturnHomeBehavior(pheromoneManager.addPheromone.bind(pheromoneManager));
            } else {
                doFoodSearchBehavior(closestFoodItem, pheromoneManager.getPheromoneDirection.bind(pheromoneManager),
	                                                pheromoneManager.addPheromone.bind(pheromoneManager));
            }
        }
	    function grabFood(closestFoodItem) {
		    holdingFood = true;
		    closestFoodItem.takeFoodBit();
	    }
	    function approachFood(closestFoodItem, addPheromoneFunc) {
		    velocity.add(steerer.seek(that.position, closestFoodItem.position, velocity, maxSpeed));
		    addPheromoneFunc(that.position, velocity, "food");
	    }
	    function followPheromoneOrWander(pheromoneDirectionFunc) {
		    var pheromoneDir = pheromoneDirectionFunc(that.position, smellRadius);
		    pheromoneDir.scale(maxSpeed);

		    velocity = pheromoneDir;
		    //If pheromoneDir is (0,0), this will give us a food searching vector
		    //Otherwise, it add a little randomness to movement.
		    velocity.add(steerer.wander(velocity));
	    }
        //endregion

        //region Public Methods and Reveals
        that.update = function (foodManager, pheromoneManager) {
            var closestFoodItem = foodManager.closestFood(that.position);

            setVelocity(closestFoodItem, pheromoneManager);

            velocity.scale(maxSpeed);

            that.position.add(velocity);

            that.setRotation(Math.atan2(velocity.y, velocity.x));
        };

        that.antHill = antHill;
        that.velocity = velocity;
        that.maxSpeed = maxSpeed;
        //endregion

        return that;
    }

    AntColony.createAnt = createAnt;

    return AntColony;
}(AntColony || {}));