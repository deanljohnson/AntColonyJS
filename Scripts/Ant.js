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
        function doReturnHomeBehavior(pheromoneManager) {
            if (AntColony.Vector.prototype.withinDistance(that.position, antHill.position, pickupRadius)) {
                holdingFood = false;
                return;
            }

            velocity.add(steerer.seek(that.position, antHill.position, velocity, maxSpeed));

            //Add a weak wander force so that our movement isn't
            //perfectly linear. Also we add a little randomness to pheromone direction
            var wanderForce = steerer.wander(velocity);
            wanderForce.multiply(0.5);
            velocity.add(wanderForce);

            //Direction for pheromone is opposite the Ant's velocity
            //it he is returning home
            //noinspection JSLint
            var pheromoneDir = new AntColony.Vector(velocity.x, velocity.y);
            pheromoneDir.multiply(-1);

            pheromoneManager.addPheromone(that.position, pheromoneDir);
        }
        function doFoodSearchBehavior(closestFoodItem, pheromoneManager) {
            var distToFood = AntColony.Vector.prototype.distanceBetween(that.position, closestFoodItem.position);

            if (distToFood < pickupRadius) {
                holdingFood = true;
                closestFoodItem.takeFoodBit();
            } else if (distToFood < smellRadius) {
                velocity.add(steerer.seek(that.position, closestFoodItem.position, velocity, maxSpeed));
            } else {
                //noinspection JSLint
                var pheromoneDir = pheromoneManager.getPheromoneDirection(that.position, smellRadius);

                if (pheromoneDir.x === 0 && pheromoneDir.y === 0) {
                    velocity.add(steerer.wander(velocity));
                    return;
                }
                velocity = pheromoneDir;
            }
        }
        function setVelocity(closestFoodItem, pheromoneManager) {
            if (holdingFood) {
                doReturnHomeBehavior(pheromoneManager);
            } else {
                doFoodSearchBehavior(closestFoodItem, pheromoneManager);
            }
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