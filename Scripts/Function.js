Function.prototype.inheritsFrom = function(parentObject){
    this.prototype = Object.create(parentObject.prototype);
    this.prototype.constructor = this;
    this.prototype.parent = parentObject.prototype;
    
    return this;
};