function Entity(x, y, imgSrc, imgWidth, imgHeight){
    this.position = new Vector(x, y);
    
    this.rotation = 0;
    
    this.img = new Image();
    this.img.src = imgSrc;
    this.img.width = imgWidth;
    this.img.height = imgHeight;
}

Entity.prototype.update = function(){
    
};

Entity.prototype.render = function(context){
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation);
    context.drawImage(this.img,-(this.img.width/2), -(this.img.height/2) );
    context.restore();
};