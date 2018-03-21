let width = $(window).width();
let height = $(window).height();
let field = new Array(width);
let img;
let ants = [];
let antCount = 20;
let extraDots = true;
let frameSkip = 100;
class Ant {
    constructor(x, y, field, width, height, color) {
        this.x = x;
        this.y = y;
        this.dir = 1;
        this.field = field;
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
    console.log(width);
    createCanvas(width, height);
    img = createImage(width, height);
    img.loadPixels();
    let w = color(255);
    let b = color(0);
    for(let i = 0; i < width; i++) {
        field[i] = new Array(height);
        for(let j = 0; j < height; j++) {
            let r = Math.round(random(1000));
            if(r == 1 && extraDots) {
                field[i][j] = 0;
                img.set(i, j, b);
            } else {
                field[i][j] = 255;
                img.set(i, j, w);
            }
        }
    }
    img.updatePixels();
    for(let i = 0; i < antCount; i++) {
        console.log(1);
        ants.push(new Ant(Math.floor(random(width)), Math.floor(random(height)), field, width, height, color(random(255), random(255), random(255))));
    }
}

function draw() {
    img.loadPixels();
    for(let step = 0; step < frameSkip; step++) {
        let x;
        let y;
        for(let i = 0; i < antCount; i++) {
            x = ants[i].x;
            y = ants[i].y;
            let dir = ants[i].dir;
            if(field[x][y] == 0) {
                ants[i].turnRight();
                field[x][y] = 255;
            } else {
                ants[i].turnLeft();
                field[x][y] = 0;
            }
            ants[i].moveForward();
            ants[i].field = field;
            let c = color(255);
            if(field[x][y] == 0) {
                c = ants[i].color;
            }
            img.set(x, y, color(c));
        }

    }

    img.updatePixels();

    image(img, 0, 0);
}