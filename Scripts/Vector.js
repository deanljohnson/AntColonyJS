function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.add = function(v){
    this.x += v.x;
    this.y += v.y;
};

Vector.prototype.length = function(){
    return Math.sqrt((this.x*this.x) + (this.y*this.y));
};

Vector.prototype.multiply = function(value){
    this.x *= value;
    this.y *= value;
};

Vector.prototype.scale = function(l){
    var length = this.length();
    
    var scaleFactor = length === 0 ? 0 : l / length ;
    
    this.multiply(scaleFactor);
};

Vector.prototype.subtract2 = function(a, b){
    if (!(a instanceof Vector) || !(b instanceof Vector)){
        throw new Exception("a and b must be vectors");
    }
    
    return new Vector(a.x - b.x, a.y - b.y);
};

Vector.prototype.distanceBetween = function(a,b){
    if (!(a instanceof Vector) || !(b instanceof Vector)){
        throw new Exception("a and b must be Vectors");
    }
    
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    
    return Math.sqrt((dx*dx)+(dy*dy));
};

Vector.prototype.squaredDistanceBetween = function(a,b){
    if (!(a instanceof Vector) || !(b instanceof Vector)){
        throw new Exception("a and b must be Vectors");
    }
    
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    
    return (dx*dx)+(dy*dy);
};