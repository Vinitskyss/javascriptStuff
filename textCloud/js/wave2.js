/**
 * Created by Sergey on 06.10.2017.
 */

let density;
let waveCount = 2;
let waves = [];

function setup() {
    canvas =  createCanvas(1980, 900);
    bg = loadImage("css/img/iceberg.jpg");
    background(bg);
    for(let i = 0; i < waveCount; i ++){
        waves.push(new createWave());
    }

    console.log(waves);
}

function createWave() {
    return [1, 2];
}

function draw() {
    
}