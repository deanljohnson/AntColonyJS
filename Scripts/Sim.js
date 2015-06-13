var canvas = document.getElementById("antColonyCanvas"),
    antHill = new AntHill(canvas.width / 2, canvas.height / 2),
    food = [];

function setup() {
    for (var f = 0, fMax = 20; f < fMax; f++){
        food.push(new Food(Math.random() * canvas.width, 
                            Math.random() * canvas.height));
    }
}

function update() {
    //Do updating of simulation here
    antHill.update(food);
    food.forEach(f => f.update());
    
    //Call update 10 milliseconds after this point
    setTimeout(update, 10);
}

function draw() {
    var context = canvas.getContext("2d");
    //Clear any data from the previous frame
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    antHill.render(context);
    food.forEach(f => f.render(context));
    
    //Draw at monitor refresh rate
    requestAnimationFrame(draw, canvas);
}

setup();
update();
draw();