let width = $(window).width();
let height = $(window).height();
width = 100;
height = 100;
let field = new Array(width);
let img;
let ants = [];
let antCount = 1;
let extraDots = false;
let frameSkip = 100000;
let fr = 60;
let w;
let b;
let start = false;
let frame = 0;

function getSum() {
    let sum = 0;
    for(let i = 0; i < width; i++) {
        for(let j = 0; j < height; j++) {
            sum += field[i][j];
        }
    }
    return sum;
}

class Ant {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.dir = 1;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    turnRight() {
        this.dir++;
        if(this.dir == 5) {
            this.dir = 1;
        }
    }

    turnLeft() {
        this.dir--;
        if(this.dir == 0) {
            this.dir = 4;
        }
    }

    moveForward() {
        switch(this.dir) {
            case 1:
                this.y--;
                if(this.y == -1) {
                    this.y = this.height - 1;
                }
                break;
            case 2:
                this.x++;
                if(this.x == this.width) {
                    this.x = 0;
                }
                break;
            case 3:
                this.y++;
                if(this.y == this.height) {
                    this.y = 0;
                }
                break;
            case 4:
                this.x--;
                if(this.x == -1) {
                    this.x = this.width - 1;
                }
                break;
        }
    }
}

function setup() {
    frameRate(fr);
    console.log(width);
    createCanvas(width, height);
    img = createImage(width, height);
    img.loadPixels();
    w = color(255);
    b = color(0);
    for(let i = 0; i < width; i++) {
        field[i] = new Array(height);
        for(let j = 0; j < height; j++) {
            let r = Math.round(random(1000));
            if(r == 1 && extraDots) {
                field[i][j] = 0;
                img.set(i, j, b);
            } else {
                field[i][j] = 1;
                img.set(i, j, w);
            }
        }
    }
    img.updatePixels();
    for(let i = 0; i < antCount; i++) {
        console.log(1);
        ants.push(new Ant(Math.floor(random(width)), Math.floor(random(height)), width, height, color(random(255), random(255), random(255))));
    }
}

function draw() {

    img.loadPixels();
    frame++;
    if(frame % 10000) {
        console.log('WORKING');
    }
    for(let step = 0; step < frameSkip; step++) {
        for(let i = 0; i < antCount; i++) {
            if(getSum(field) == 100 * 100 && start) {
                console.log(10);
                img.updatePixels();
                noLoop();
                throw 'DONE!';
                img.updatePixels();
                image(img, 0, 0);
            }
            start = true;
            let x = ants[i].x;
            let y = ants[i].y;
            let dir = ants[i].dir;
            if(field[x][y] == 0) {
                ants[i].turnRight();
                field[x][y] = 1;
            } else {
                ants[i].turnLeft();
                field[x][y] = 0;
            }
            ants[i].moveForward();

            if(field[x][y] == 0) {
                img.set(x, y, ants[i].color);
            } else {
                img.set(x, y, w);
            }

        }
    }

}