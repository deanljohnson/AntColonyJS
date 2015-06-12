function Food(x, y){
    this.x = x;
    this.y = y;
    this.foodBits = 20;
    
    this.img = new Image();
    this.img.src = "Images/Food.png";
    this.img.width = 10;
    this.img.height = 10;
}

Food.prototype.update = function(){
    
};

Food.prototype.render = function(context){
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