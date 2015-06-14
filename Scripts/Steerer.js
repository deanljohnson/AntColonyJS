function Steerer(){
    this.wanderCircleDistance = 40;
    this.wanderCirlceRadius = 10;
    this.wanderAngle = 1;
    this.wanderAngleChange = 1;
}

Steerer.prototype.seek = function(position, target, velocity, maxSpeed){
    var difVector = Vector.prototype.subtract2(target, position);
    difVector.scale(maxSpeed);
    return Vector.prototype.subtract2(difVector, velocity);
};

Steerer.prototype.wander = function(velocity){
    var circleCenter = new Vector(velocity.x, velocity.y);
    circleCenter.scale(this.wanderCircleDistance);

    var displacement = new Vector(0, -1);
    displacement.scale(this.wanderCirlceRadius);
    displacement.setAngle(this.wanderAngle);

    //Change our wander angle just slightly so that
    //it will be different next frame
    this.wanderAngle += (Math.random() * this.wanderAngleChange) - this.wanderAngleChange * .5;

    var wanderForce = new Vector(circleCenter.x, circleCenter.y);
    wanderForce.add(displacement);
    return wanderForce;
};