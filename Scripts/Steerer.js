var AntColony = (function (AntColony) {
    "use strict";
    function Steerer() {
        this.wanderCircleDistance = 40;
        this.wanderCirlceRadius = 10;
        this.wanderAngle = 1;
        this.wanderAngleChange = 1;
    }

    Steerer.prototype.seek = function (position, target, velocity, maxSpeed) {
        var difVector = AntColony.Vector.prototype.subtract2(target, position);
        difVector.scale(maxSpeed);
        return AntColony.Vector.prototype.subtract2(difVector, velocity);
    };

    Steerer.prototype.wander = function (velocity) {
        var circleCenter = new AntColony.Vector(velocity.x, velocity.y);
        circleCenter.scale(this.wanderCircleDistance);

        var displacement = new AntColony.Vector(0, -1);
        displacement.scale(this.wanderCirlceRadius);
        displacement.setAngle(this.wanderAngle);

        //Change our wander angle just slightly so that
        //it will be different next frame
        this.wanderAngle += (Math.random() * this.wanderAngleChange) - this.wanderAngleChange * 0.5;

        //noinspection JSLint
        var wanderForce = new AntColony.Vector(circleCenter.x, circleCenter.y);
        wanderForce.add(displacement);
        return wanderForce;
    };

    AntColony.Steerer = Steerer;

    return AntColony;
}(AntColony || {}));
