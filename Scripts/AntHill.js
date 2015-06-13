function AntHill (x, y){
    this.ants = [];
    
    for (var a = 0, aMax = 50; a < aMax; a++){
        var antX = x + ((Math.random() - Math.random()) * 300);
        var antY = y + ((Math.random() - Math.random()) * 300);
        this.ants.push(new Ant(antX, antY, this));
    }
    
    Entity.call(this, x, y, "Images/AntHill.png", 50, 50);
}

AntHill.inheritsFrom(Entity);

AntHill.prototype.update = function(food){
    this.ants.forEach(a => a.update(food));
};

AntHill.prototype.render = function(context){
    this.parent.render.call(this, context);
    
    this.ants.forEach(a => a.render(context));
};