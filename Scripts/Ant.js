function Ant(x, y, antHill){
    this.x = x;
    this.y = y;
    this.antHill = antHill;
    
    this.vX = 0;
    this.vY = 0;
    this.rotation = 0;
    this.maxSpeed = .6;
    
    this.img = new Image();
    this.img.src = "Images/Ant.png";
    this.img.width = 14;
    this.img.height = 7;
}

Ant.prototype.update = function(){
    this.x += this.vX;
    this.y += this.vY;
    
    this.rotation = Math.atan2(this.vY, this.vX);
};

Ant.prototype.render = function(context){
    //Save the current position of the "pen", 
    //so that we can return to a default state
    context.save();
    //Move the pen in to position
    context.translate(this.x, this.y);
    //Draw the image centered at the pens position
    context.drawImage(this.img, -(this.img.width/2), -(this.img.height/2));
    //Restore the previous state of the context
    context.restore();
};