let canvas;
let width = $(window).width();
let height = $(window).height();
let snowCount = 400;
let snowDrops = [];
let img;


function setup() {
    canvas = createCanvas(width, height)
    canvas.position((width - windowWidth) / -2, 0);
    canvas.parent('canvas');
    //img = loadImage('https://vignette.wikia.nocookie.net/mlp/images/a/a0/%D0%A1%D0%BD%D0%B5%D0%B6%D0%B8%D0%BD%D0%BA%D0%B0.png/revision/latest?cb=20151209160025&path-prefix=ru');
    for(let i = 0; i < snowCount; i++) {
        snowDrops.push(new Snow());
    }
}

function draw() {
    fill(255)
    noStroke()
    background('red')
    for(let i = 0; i < snowCount; i++) {
        snowDrops[i].update()
    }
}

class Snow {
    constructor() {
        this.x = random(0, windowWidth);
        this.y = random(-100, -100 - height);
        //this.img = img;
    }
    update() {

        if(this.y > height) {
            this.y = 0;
        }
        this.x += random(-0.5, 0.5)
        this.y += random(0.3, 1.5);
        ellipse(this.x, this.y, 5, 5);
    }
}