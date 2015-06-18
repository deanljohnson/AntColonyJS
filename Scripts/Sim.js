var AntColony = (function (AntColony) {
    "use strict";
    var canvas = document.getElementById("antColonyCanvas"),
        antHill = AntColony.createAntHill(canvas.width / 2, canvas.height / 2),
        food = [],
        foodManager = AntColony.createFoodManager(50, canvas.width, canvas.height),
        pheromoneManager = AntColony.createPheromoneManager();

    function update() {
        //Do updating of simulation here
        antHill.update(foodManager, pheromoneManager);
        foodManager.update();
        pheromoneManager.update();

        keepAntsOnScreen();

        //Call update at 60 fps
        setTimeout(update, (1000 / 60));
    }

    function draw() {
        var context = canvas.getContext("2d");
        //Clear any data from the previous frame
        context.clearRect(0, 0, canvas.width, canvas.height);

        antHill.render(context);
        foodManager.render(context);

        //Draw at monitor refresh rate
        requestAnimationFrame(draw);
    }

    function keepAntsOnScreen() {
        var ant;
        for (var a = 0, aMax = antHill.ants.length; a < aMax; a++){
            ant = antHill.ants[a];

            if (ant.position.x < 0){
                ant.position.x = canvas.width;
            }
            else if (ant.position.x > canvas.width){
                ant.position.x = 0;
            }

            if (ant.position.y < 0){
                ant.position.y = canvas.height;
            }
            else if (ant.position.y > canvas.height){
                ant.position.y = 0;
            }
        }
    }

    update();
    draw();
}(AntColony || {}));