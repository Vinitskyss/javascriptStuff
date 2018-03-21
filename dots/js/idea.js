let canvas;
let dots = [];
let count = 100;
let maxDist = 100;

function setup() {
    canvas = createCanvas(800, 800);
    for(let i = 0; i < count; i++) {
        dots.push(new Dot());
    }

}

function drawLines(x) {

}

function draw() {

    background('#222222');
    for(let i = 0; i < count; i++) {
        let x1 = dots[i].position.x;
        let y1 = dots[i].position.y;
        for(let j = i + 1; j < count; j++) {
            let x2 = dots[j].position.x;
            let y2 = dots[j].position.y;
            let dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
            if(dist < maxDist) {
                stroke(map(dist, 0, maxDist, 200, 34));
                strokeWeight(map(dist, 0, maxDist, 2, 0))
                line(x1, y1, x2, y2);
            }
        }
        dots[i].update();
    }
}


class Dot {
    constructor() {

        this.position = createVector(random(width), random(height));
        this.velocity = createVector(random(-2, 2), random(-2, 2));
        this.width = random(3, 7);
        this.color = 137;
    }

    update() {
        this.position.add(this.velocity);
        this.display();
        this.checkEdges();
    }

    display() {
        noStroke();
        fill(this.color);
        ellipse(this.position.x, this.position.y, this.width, this.width);
    }

    checkEdges() {

        if(this.position.x > width) {
            this.position.x = 0;
        } else if(this.position.x < 0) {
            this.position.x = width;
        }

        if(this.position.y > height) {
            this.position.y = 0;
        } else if(this.position.y < 0) {
            this.position.y = height;
        }
    }
}