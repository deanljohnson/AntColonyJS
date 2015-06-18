var AntColony = (function (AntColony) {
    "use strict";
    function createEntity(x, y, imgSrc, imgWidth, imgHeight) {
        var position = new AntColony.Vector(x, y),
            rotation = 0,
            img = new Image(),
            that = {};

        img.src = imgSrc;
        img.width = imgWidth;
        img.height = imgHeight;

        //region Public Methods and Reveals
        that.render = function (context) {
            context.save();
            context.translate(position.x, position.y);
            context.rotate(rotation);
            context.drawImage(img, -(img.width / 2), -(img.height / 2));
            context.restore();
        };
        that.setRotation = function (value) {
            rotation = value;
        };

        that.position = position;
        //endregion

        return that;
    }

    AntColony.createEntity = createEntity;

    return AntColony;
}(AntColony || {}));
