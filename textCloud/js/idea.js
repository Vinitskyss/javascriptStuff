/**
 * Created by Sergey on 06.10.2017.
 */

let canvas;
let dots = [];
let dotsCount = 175;
let otherDots = Math.floor(dotsCount / 3);
let radius = 5;
let fadeIn = 255;
let words;
let k = 2;
let wordSpeed;
let maxSpeed = 1.3;
let minSpeed = 0.1;
let maxH = 190;
let minH = 30;
let medH = 100;
let headerSize = 80;

function setup() {
    headerSize = map(windowWidth, 0, 1920, 10, 80);
    frameRate(30);
    if(windowWidth < 400){
        dotsCount = 40;
        otherDots = Math.floor(dotsCount / 3);
        headerSize = 50;
    }
    canvas =  createCanvas(1920, 900);
    canvas.position((1929 - windowWidth) / -2,0);
    canvas.parent('canvas');

    let inside = true;
    for(let i = 0; i < dotsCount + otherDots; i++){
        dots.push(new addDot(inside, minH, medH, maxH,minSpeed,maxSpeed));
        if(i == dotsCount){
            inside = false;
        }
    }
}

function checkRad(x, y) {
    let r = 300;
    if(abs(x - 960) < 100){
        return false;
    }
    if((x - 960) * (x - 960) + (y - 450) * (y - 450) < r * r){
        return true;
    }
    return false;
}

function addDot(inCircle, minH, medH, maxH,minSpeed,maxSpeed) {
    let x, y, hue;
    console.log(inCircle);
    x = random(100, 1820);
    while(abs(x - 960) < 100){
        x = random(100, 1920);
    }
    y = random(120, 850);
    while (inCircle){
        x = random(400, 1420);
        y = random(160, 800);
        if(checkRad(x, y)){

            break;
        }
    }
    if(Math.round(0, 1)){

        if(inCircle){
            if(x < 960){
                hue = map(x, 400, 960, medH, maxH);
            }else {
                hue = map(x, 960, 1420, maxH, medH);
            }
        }else {
            if (x < 960) {
                hue = map(x, 200, 960, medH, maxH);
            } else {
                hue = map(x, 960, 1620, maxH, medH);
            }
        }
    }else {
        if(inCircle){
            if(x < 960){
                hue = map(x, 400, 960, medH, minH);
            }else {
                hue = map(x, 960, 1420, minH, medH);
            }
        }else {
            if (x < 960) {
                hue = map(x, 200, 960, medH, minH);
            } else {
                hue = map(x, 960, 1620, minH, medH);
            }
        }
    }

    words = ['BIG DATA', 'SOCIAL', 'DATABASES', 'SETS', 'INDEXING', 'SET', 'TOOLS', 'COMPUTING', 'INTERNET',
        'SOFTWARE', 'ANALYTICS', 'Aggregation', 'Algorithm', 'Anonymization', 'Artificial Intelligence',
        'Avro', 'Cascading','Cassandra', 'Chukwa', 'Cloud', 'Comparators', 'Confabulation', 'Dashboard',
        'Database', 'Data collection', 'Data center', 'Data feed', 'Data mining', 'Data point', 'Data science',
        'Data set', 'Drill', 'INIT8', 'HDFS', 'Hue', 'Linked data', 'Log file', 'Machine-generated data',
        'Machine learning', 'Metadata', 'MongoDB', 'Multi-Dimensional Databases', 'Network analysis',
        'NewSQL','Object Databases', 'OpenDremel', 'Parallel processing', 'Parallel query', 'Query',
        'Real-time data', 'Root-cause analysis', 'Schema', 'Server', 'Structured data'];

    let dir;
    if(hue < 150){
        dir = 0;
    }else{
        dir = 1;
    }
    wordSpeed = random(minSpeed,maxSpeed);

    let dot = [x, y, hue, words[Math.floor(random(0, words.length))], 10 + random(-4, 4), dir, Math.abs(960 - x), Math.abs(wordSpeed)];

    return dot;
}

function changeDir(x, lim, d) {
    if(abs(960 - x) > lim){
        return !d;
    }
    return d;
}

function updateDot(dots, minH, medH, maxH) {

    let lim;
    let speedX;
    let speedY;
    let k = -1;
    let k1 = 50;
    for(let i = 0; i < dots.length; i++){
        lim = dots[i][6];
        speedX = dots[i][7];
        dots[i][7] += random(-0.01, 0.01);
        if(dots[i][5]){
            dots[i][0] += speedX;
            if(dots[i][0] > 960){
                k = 1;
                dots[i][2]  = map(dots[i][0], 960, 960 + lim, maxH, medH);
            }else {
                k = -1;
                dots[i][2]  = map(dots[i][0], 960 - lim, 960, medH, maxH);
            }
            speedY = k * (speedX / k1);
            dots[i][1] += speedY;
        }else {
            dots[i][0] -= speedX;
            if(dots[i][0] > 960){
                k = 1;
                dots[i][2]  = map(dots[i][0], 960, 960 + lim, minH, medH);
            }else {
                k = -1;
                dots[i][2]  = map(dots[i][0], 960 - lim, 960, medH, minH);
            }
            speedY = k * (speedX / k1);
            dots[i][1] += speedY;
        }
        dots[i][5] = changeDir(dots[i][0], dots[i][6], dots[i][5]);
    }
}

function getMousePosX(hue) {

    if(mouseX === false){
        return 990;
    }
    hue -= 125;
    return ((mouseX - 990) / 200) * (hue / 10);
}

function getMousePosY(hue) {

    if(mouseY === false){
        return 450;
    }
    hue -= 125;
    return ((mouseY - 450) / 200) * (hue / 10);
}

function draw() {
    noStroke();
    updateDot(dots,minH, medH, maxH);
    background(0);

    if(fadeIn > 0){
        fadeIn -= 3;
    }


    for(let i = 0; i < dotsCount + otherDots; i++){
        fill(dots[i][2] - fadeIn);

        textSize(dots[i][4]);
        text(dots[i][3], dots[i][0] + (getMousePosX(dots[i][2])) , dots[i][1] + (getMousePosY(dots[i][2])));

    }
    fill(0, 0, 0, 150);
    rect(-10 + (width /2) - headerSize * 7,(height / 2) - headerSize + 10,10 + headerSize * 14.5, headerSize);
    rect(-10 + (width /2) - headerSize * 2.5, (height / 2) * 1.04, headerSize * 5.5, headerSize * 0.8);

    fill(255 - fadeIn);
    textSize(headerSize);
    text("УНИВЕРСИТЕТСКИЙ ПОРТАЛ", (width /2) - headerSize * 7, height / 2);

    fill(255 - fadeIn);
    textSize(headerSize/ 3);
    text("по работе с большими данными", (width /2) - headerSize * 2.4, 45 + (height / 2));


}

window.onresize = function () {
    headerSize = map(windowWidth, 0, 1920, 10, 80);
    canvas.position((1920 - windowWidth) / -2,0);
}