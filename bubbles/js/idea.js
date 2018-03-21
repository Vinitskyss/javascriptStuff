let canvas;
let bubbles = [];
let maxL = 300;
let k = 10;
let count = 0;
function setup() {
	background(0);
    canvas = createCanvas(700, 700);
    canvas.parent('canvas');
}

function draw() {
    background(0);
    if(count % 1 == 0){
    	count = 0;
    	bubbles.push(new Bubble(random(0, width), random(0, height), random(15, 20)));
    }
    count++;
    for (let i = 0; i < bubbles.length; i++){
    	if(i && !bubbles[i-1].xv){
    		bubbles[i-1].xv = map(bubbles[i-1].x - bubbles[i].x, -maxL, maxL, -k, k);
    		bubbles[i-1].yv = map(bubbles[i-1].y - bubbles[i].y, -maxL, maxL, -k, k);
    	}
    	bubbles[i].show();
    	bubbles[i].update();
    }

    for(let i = bubbles.length - 1; i > 0; i--){
    	if(bubbles[i].alpha == 0 || bubbles[i].x > width || bubbles[i].x < 0){
    		bubbles.splice(i, 1);
    	}
    }
}

class Bubble{

	constructor(x, y, r, xv, yv){
		this.x = x;
		this.y = y;
		this.r = r;
		this.alpha = 255;
		this.xv = 0;
		this.yv = 0;
	}

	fadeOut(){
		if(this.alpha > 0){
			this.alpha--;
		}
		this.r = map(this.alpha, 0, 255, 0, 20);
	}

	move(){
		this.x += random(-1, 1) * 0 + this.xv;
		this.y += random(-1, 1) * 0 + this.yv;
	}

	update(){
		this.fadeOut();
		this.move();
	}

	show(){
		fill(alpha(color(255, 255, 255, this.alpha)));
		ellipse(this.x, this.y, this.r);
	}
}