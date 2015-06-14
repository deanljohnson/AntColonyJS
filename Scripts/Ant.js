function Ant(x, y, antHill){
    this.antHill = antHill;
    
    this.velocity = new Vector(0, 0);
    this.maxSpeed = .6;

    this.steerer = new Steerer();

    Entity.call(this, x, y, "Images/Ant.png", 14, 7);
}

Ant.inheritsFrom(Entity);

Ant.prototype.update = function(food, pheromoneManager){
    var closestFood = this.closestFood(food);

    //this.velocity.add(this.steerer.seek(this.position, closestFood.position,
                                       //this.velocity, this.maxSpeed));

    this.velocity.add(this.steerer.wander(this.velocity));

    this.velocity.scale(this.maxSpeed);

    this.position.add(this.velocity);
    
    this.rotation = Math.atan2(this.velocity.y, this.velocity.x);
};

Ant.prototype.closestFood = function(food){
    var closestFood = food[0],
        closestDistance = Vector.prototype.squaredDistanceBetween(this.position, 
                                           closestFood.position),
        tempDistance = closestDistance;

    for(var i = 1, l = food.length; i < l; i++){
        tempDistance = Vector.prototype.squaredDistanceBetween(this.position, 
                                        food[i].position);
        if(tempDistance < closestDistance){
            closestFood = food[i];
            closestDistance = tempDistance;
        }
    }
    
    return closestFood;
};