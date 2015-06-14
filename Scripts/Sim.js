var canvas = document.getElementById("antColonyCanvas");

function update() {
    //Do updating of simulation here
    
    //Call update at 60 fps
    setTimeout(update, (1000 / 60));
}

function draw() {
    //Draw at monitor refresh rate
    requestAnimationFrame(draw);
}

update();
draw();