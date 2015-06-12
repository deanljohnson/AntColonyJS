function AntHill (x, y){
    this.x = x;
    this.y = y;
    this.ants = [];
    
    for (var a = 0, aMax = 50; a < aMax; a++){
        this.ants.push(new Ant(x, y, this));
    }
    
    this.img = new Image();
    this.img.src = "Images/AntHill.png";
    this.img.width = 50;
    this.img.height = 50;
}

AntHill.prototype.update = function(){
    this.ants.forEach(a => a.update());
};

AntHill.prototype.render = function(context){
    //Save the current position of the "pen", 
    //so that we can return to a default state
    context.save();
    //Move the pen in to position
    context.translate(this.x, this.y);
    //Draw the image centered at the pens position
    context.drawImage(this.img, -(this.img.width/2), -(this.img.height/2));
    //Restore the previous state of the context
    context.restore();
    
    this.ants.forEach(a => a.render(context));
};