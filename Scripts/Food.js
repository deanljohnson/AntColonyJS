function Food(x, y){
    this.foodBits = 20;
    
    Entity.call(this, x, y, "Images/Food.png", 10, 10);
}

Food.inheritsFrom(Entity);

Food.prototype.update = function(){
    
};