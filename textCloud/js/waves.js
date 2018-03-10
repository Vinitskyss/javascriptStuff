let density = 160;
let canvas;
let gap;
let startpos = 0;
let phase = 0;
let sinK;
let bg;
let newWave;
let wawesCount = 4;
let waves = [wawesCount];
let x1, x2;
let config;
function createWave(density, startpos, gap, number) {
    newWave = [];
    config = [
        [0, 0, 32, 67, 50, startpos+50],
        [0, 62, 194, 234, 20, startpos],
        [0, 113, 222, 255, 10, startpos],
        [0, 235, 250, 255, 5, startpos]
    ]
    newWave.length = 0;
    newWave.push(config[number]); //phase

    for(let i = 0; i < density; i++){
        newWave.push([i * gap, config[i][4] + random(-5, 5), gap * (i+1), config[i][4] + random(-5, 5)]);
    }
    return newWave;
}

function setup() {
    canvas =  createCanvas(1980, 800);
    bg = loadImage("css/img/iceberg1.jpg");
    background(bg);
    canvas.parent('ocean');
    startpos = height / 2 + 15;
    gap = width / density;

    for(let i = 0; i < wawesCount; i++){
        waves.push(new createWave(density, startpos, gap, i));
    }

}

function getDir(y1, y2){
    let k = 1;
    let ret = 0.1;
    if(y1 - y2 < -k) {
        return -ret;
    }else if(y2 - y1 < -k){
        return ret;
    }
    return random(-ret, ret);
}

function getPhase(phase) {
    return phase + random(0.001, 0.06)
}

function waving(waves) {

    for(let i = 1; i < waves.length; i++){
        waves[i][0][0] = getPhase(waves[i][0][0]);

        for(let j = 1; j < waves[i].length-1; j++) {
            sinK = 0.3 * sin(waves[i][0][0] + j / 16);
            waves[i][j][3] += getDir(waves[i][j][1], waves[i][j][3])+sinK;
            waves[i][j + 1][1] = waves[i][j][3];
        }

    }

    return waves;
}

function draw() {
    background(bg)
    waves = waving(waves);

    for(let i = 1; i < waves.length; i++){
        stroke(waves[i][0][1], waves[i][0][2],waves[i][0][3]);
        strokeWeight(waves[i][0][4]);

        for(let j = 1; j < waves[i].length; j++){
            line(waves[i][j][0], waves[i][j][1], waves[i][j][2], waves[i][j][3])
        }
    }

}


