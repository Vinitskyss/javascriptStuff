"use strict";
let canvas;
let bg;
let newCoords = "";
let coords = [{ 'x': 154, 'y': 272 }, { 'x': 100, 'y': 714 }, { 'x': 363, 'y': 321 }, { 'x': 407, 'y': 612 }, { 'x': 476, 'y': 783 }, { 'x': 774, 'y': 220 },
    { 'x': 644, 'y': 71 }, { 'x': 996, 'y': 261 },
    { 'x': 1245, 'y': 206 }, { 'x': 1432, 'y': 266 }, { 'x': 1700, 'y': 241 }, { 'x': 1534, 'y': 570 }, { 'x': 1463, 'y': 678 }, { 'x': 1703, 'y': 201 }
];
let colors = [{ 'r': 233, 'g': 165, 'b': 28 }, { 'r': 79, 'g': 165, 'b': 220 }, { 'r': 0, 'g': 167, 'b': 61 }, { 'r': 227, 'g': 59, 'b': 40 }];
let data = [];
let words = ['Init8!', 'Software Dev.', 'Teacher', 'Police Officer', 'Likes Icecream', 'Hates Mondays', 'Likes Sports',
    'Gamer', 'Heavy Metal Fan', 'Shopping Lifter', 'Opera Singer', 'Draws Graffiti', 'Alcoholic', 'Ex. Addict',
    'Refugee', 'Writes Poems', 'Online Scammer', 'Food Designer', 'Works In Caffee', 'Lives With Parents',
    'Never Pays Taxes'
];

function setup() {
    if (windowWidth < 400) {
        frameRate(5);
    }
    canvas = createCanvas(1920, 900);
    canvas.position((1929 - windowWidth) / -2, 0);
    canvas.parent('canvas');
    bg = loadImage("css/img/7.jpg");
    background(bg);
    for (let i = 0; i < coords.length && windowWidth > 400; i++) {
        data.push(new Phrase(coords[i], words, colors));
    }
}

class Phrase {
    constructor(coord, words, colors) {
        this.words = words;
        this.colors = colors;
        this.currentWord;
        this.currentCoord = coord;
        this.currentColor;
        this.textSize = 20;
        this.height = this.textSize * 1.4;
        this.width;
        this.alpha = 0;
        this.fade = random(1, 4);
        this.update();
        this.fadeIn = false;
    }

    update() {
        this.currentWord = random(this.words);
        this.currentColor = random(this.colors);
        this.width = textWidth(this.currentWord);
    }

    fadeB() {
        let k;
        if (this.fadeIn) {
            k = 10;
        } else {
            k = -1;
        }
        if (this.alpha > 0) {
            this.alpha += this.fade * k;
        }
        if (this.alpha > 1500) {
            this.fadeIn = false;
        }
    }

    show() {
        this.fadeB();
        textSize(this.textSize);
        let r = this.currentColor['r'];
        let g = this.currentColor['g'];
        let b = this.currentColor['b'];
        let x1 = this.currentCoord['x'];
        let y1 = this.currentCoord['y'];
        noStroke();
        fill(color(r, g, b, this.alpha));
        rect(x1 - 5 - this.width / 2, y1 - this.height, this.width + 10, this.height, 5);
        let x2 = x1 + 10;
        let x3 = x1 + 5;
        let y3 = y1 + 10;
        triangle(x1, y1, x2, y1, x3, y3);
        fill(255, 255, 255, this.alpha);
        text(this.currentWord, x1 - this.width / 2, y1 - 7);
    }

}

function draw() {
    background(bg);
    if (windowWidth > 400) {
        canvas.position((1920 - windowWidth) / -2, 0);
        for (let i = 0; i < data.length; i++) {
            data[i].show();
            if (floor(random(0, 1000)) < 1 && data[i].alpha <= 0) {
                data[i].alpha = 1;
                data[i].update();
                data[i].fadeIn = true;
            }
        }
    }
}

function mouseClicked() {
    //newCoords = newCoords+"{'x':"+mouseX+",'y':"+mouseY+"},";
}

window.onresize = function() {
    canvas.position((1920 - windowWidth) / -2, 0);
}