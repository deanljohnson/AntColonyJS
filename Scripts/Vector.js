var AntColony = (function (AntColony) {
    "use strict";
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }

    Vector.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;

	    return this;
    };

    Vector.prototype.length = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };

    Vector.prototype.multiply = function (value) {
        this.x *= value;
        this.y *= value;

	    return this;
    };

    Vector.prototype.scale = function (l) {
        var length = this.length(),
            scaleFactor = length === 0 ? 0 : l / length;

        this.multiply(scaleFactor);

	    return this;
    };

    Vector.prototype.setAngle = function (angle) {
        var len = this.length();
        this.x = Math.cos(angle) * len;
        this.y = Math.sin(angle) * len;

	    return this;
    };

    Vector.subtract2 = function (a, b) {
        if (!(a instanceof Vector) || !(b instanceof Vector)) {
            throw new Error("a and b must be vectors");
        }

        return new Vector(a.x - b.x, a.y - b.y);
    };

    Vector.distanceBetween = function (a, b) {
        if (!(a instanceof Vector) || !(b instanceof Vector)) {
            throw new Error("a and b must be Vectors");
        }

        var dx = a.x - b.x,
            dy = a.y - b.y;

        return Math.sqrt((dx * dx) + (dy * dy));
    };

    Vector.squaredDistanceBetween = function (a, b) {
        if (!(a instanceof Vector) || !(b instanceof Vector)) {
            throw new Error("a and b must be Vectors");
        }

        var dx = a.x - b.x,
            dy = a.y - b.y;

        return (dx * dx) + (dy * dy);
    };

    Vector.average = function (vectors) {
	    if (vectors.length === 0) {
		    return new Vector(0, 0);
	    }

        var avgVector = new Vector(vectors[0].x, vectors[0].y),
            v,
            vMax;

        for (v = 1, vMax = vectors.length; v < vMax; v++) {
            avgVector.add(vectors[v]);
        }
        avgVector.multiply(1 / vMax);

        return avgVector;
    };

    Vector.withinDistance = function (v1, v2, d) {
        if (!(v1 instanceof Vector) || !(v2 instanceof Vector)){
            throw new Error("v1 and v2 must be vectors");
        }

        //If the difference in x and y values is greater
        // than d we know they are too far apart
        if (Math.abs(v1.x - v2.x) > d) return false;
        if (Math.abs(v1.y - v2.y) > d) return false;

        //Square the distance so we don't need to calculate a square root
        d = (d * d);

        return Vector.squaredDistanceBetween(v1, v2) <= d;
    };

    AntColony.Vector = Vector;

    return AntColony;
}(AntColony || {}));
