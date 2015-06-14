function PheromoneManager(){
    this.pheromones = [];
    this.pheromoneDispersion = 6;
}

PheromoneManager.prototype.update = function(){
    this.pheromones.forEach(p => p.update());
    this.removeEvaporatedPheromones();
};

PheromoneManager.prototype.removeEvaporatedPheromones = function(){
    for(var p = 0, l = this.pheromones.length; p < l; p++){
        if (this.pheromones[p].strength < 0){
            this.pheromones.splice(p, 1);
            p--;
            l--;
        }
    }
};

PheromoneManager.prototype.addPheromone = function(pos, dir){
    var newPheromone = new Pheromone(pos.x, pos.y, dir.x, dir.y);

    for(var p = 0, l = this.pheromones.length; p < l; p++){
        if (Vector.prototype.withinDistance(this.pheromones[p].position,
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
        if (Vector.prototype.withinDistance(this.pheromones[p].position,
                pos, range))
        {
            pheromoneDirections.push(this.pheromones[p].direction);
        }
    }

    if (pheromoneDirections.length > 0 ){
        return Vector.prototype.average(pheromoneDirections);
    }

    return new Vector(0, 0);
};