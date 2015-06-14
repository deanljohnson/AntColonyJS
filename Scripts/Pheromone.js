function Pheromone(x, y, dirx, diry){
    this.position = new Vector(x, y);
    this.direction = new Vector(dirx, diry);
    this.strength = 100;
}

Pheromone.prototype.decayRate = .2;

Pheromone.prototype.update = function (){
    this.strength -= this.decayRate;
};

Pheromone.prototype.combine = function(other){
    if (!(other instanceof Pheromone)){
        throw new Exception("Cannot combine a Pheromone with something that isn't also a Pheromone");
    }

    var avgPos = Vector.prototype.average([this.position, other.position]);
    var avgDir = Vector.prototype.average([this.direction, other.direction]);
    var newStrength = this.strength + other.strength;
    newStrength = (newStrength > 100) ? 100 : newStrength;

    this.position = avgPos;
    this.direction = avgDir;
    this.strength = newStrength;
};