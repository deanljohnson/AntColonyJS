var canvas = document.getElementById("antColonyCanvas");

function update() {
    //Do updating of simulation here
    
    //Call update 10 milliseconds after this point
    setTimeout(update, 10);
}

function draw() {
    //Draw at monitor refresh rate
    requestAnimationFrame(draw, canvas);
}

update();
draw();