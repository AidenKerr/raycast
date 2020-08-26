let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 100;

const sceneW = 400;
const sceneH = 400;
let sliderFOV;

function setup() {
    createCanvas(800, 400);


    // for (let i = 0; i < 5; i++) {
    //     let x1 = random(sceneW);
    //     let x2 = random(sceneW);
    //     let y1 = random(sceneH);
    //     let y2 = random(sceneH);
    //     walls[i] = new Boundary(x1, y1, x2, y2);
    // }

    walls.push(new Boundary(0,0, sceneW, 0));
    walls.push(new Boundary(sceneW,0, sceneW, sceneH));
    walls.push(new Boundary(0,0, sceneW, 0));
    walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
    walls.push(new Boundary(0, sceneH, 0, 0));

    walls.push(new Boundary(60, 60, 60, 200));
    walls.push(new Boundary(60, 60, 200, 60));
    walls.push(new Boundary(200, 60, 200, 50));
    walls.push(new Boundary(50, 50, 200, 50));
    walls.push(new Boundary(50, 50, 50, 200));
    walls.push(new Boundary(50, 200, 60, 200));

    walls.push(new Boundary(80, 80, 80, 85));
    walls.push(new Boundary(80, 80, 85, 80));
    walls.push(new Boundary(80, 85, 85, 85));
    walls.push(new Boundary(85, 85, 85, 80));

    walls.push(new Boundary(300, 300, 300, 310));
    walls.push(new Boundary(300, 300, 310, 300));
    walls.push(new Boundary(300, 310, 310, 310));
    walls.push(new Boundary(310, 310, 310, 300));


    // circle 1
    let points = 50;
    let r = 8;
    let originX = 280;
    let originY = 305;
    let angle1;
    let angle2;

    for (let i = 0; i < points; ++i) {
        angle1 = i * 2 * Math.PI / points;
        angle2 = (i+1) * 2 * Math.PI / points;
        walls.push(new Boundary(originX + r * Math.cos(angle1), originY + r * Math.sin(angle1),
            originX + r * Math.cos(angle2), originY + r * Math.sin(angle2)));
    }

    r = 50;
    originX = 150;
    originY = 150;
    for (let i = 0; i < points; ++i) {
        angle1 = i * 2 * Math.PI / points;
        angle2 = (i+1) * 2 * Math.PI / points;
        walls.push(new Boundary(originX + r * Math.cos(angle1), originY + r * Math.sin(angle1),
            originX + r * Math.cos(angle2), originY + r * Math.sin(angle2)));
    }


    particle = new Particle();
    sliderFOV = createSlider(0, 360, 45);
    sliderFOV.input(changeFOV);
}

function changeFOV() {
    const fov = sliderFOV.value();
    particle.updateFOV(fov);
}

function draw() {
    // if (keyIsDown(LEFT_ARROW)) {
    //     particle.rotate(-0.05);
    // }
    // if (keyIsDown(RIGHT_ARROW)) {
    //     particle.rotate(0.05);
    // }
    if (keyIsDown(87)) {
        particle.move(1, 0);
    }
    if (keyIsDown(83)) {
        particle.move(-1, 0);
    }
    if (keyIsDown(65)) {
        particle.move(0, 1);
    }
    if (keyIsDown(68)) {
        particle.move(0, -1);
    }
    particle.moveHead();

    background(0);
    for (let wall of walls) {
        wall.show();
    }
    // particle.update(noise(xoff) * sceneW, noise(yoff) * sceneH);
    // xoff += 0.01;
    // yoff += 0.01;


    //particle.update(mouseX, mouseY);
    particle.show();

    const scene = particle.look(walls);
    const w = sceneW / scene.length;
    push();
    const lookY = map(mouseY, 0, sceneH, 300, -300);
    translate(sceneW, 0);
    noStroke();
    fill(color(210,220,220));
    rect(0, 0, sceneW, lookY + sceneH / 2);
    fill(color(129,69,19));
    rect(0,max(0, lookY + sceneH / 2), sceneW, sceneH);
    for (let i = 0; i < scene.length; i++) {
        const sq = scene[i]*scene[i];
        const wSq = sceneW*sceneW;
        const b = map(sq, 0,  wSq, 255, 0);
        //const h = map(scene[i], 0, sceneW, sceneH, 0)
        fill(b);
        rectMode(CENTER);
        rect(i * w + w / 2, sceneH / 2 + lookY, w + 1, sceneH * sliderFOV.value() / scene[i]);
    }
    pop();


}
