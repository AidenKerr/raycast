class Particle {
    constructor() {
        this.fov = 45;
        this.pos = createVector(sceneW / 2, sceneH / 2);
        this.rays = [];
        this.heading = 0;
        this.step = 0.2;
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.step) {
            this.rays.push( new Ray(this.pos, radians(a)));
        }
    }

    // rotate(angle) {
    //     this.heading += angle;
    //     let index = 0;
    //     for (let a = -this.fov / 2; a < this.fov / 2; a += 0.1) {
    //         this.rays[index].setAngle(radians(a) + this.heading);
    //         index++;
    //     }
    // }

    moveHead() {
        const heading = map(mouseX, sceneW / 2, sceneW, 0, Math.PI);
        this.heading = heading;
        let index = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.step) {
            this.rays[index].setAngle(radians(a) + this.heading);
            index++;
        }
    }

    move(amtX, amtY) {
        const velX = p5.Vector.fromAngle(this.heading);
        const velY = p5.Vector.fromAngle(this.heading - (Math.PI / 2));
        velX.setMag(amtX);
        velY.setMag(amtY);
        this.pos.add(velX).add(velY);
    }

    update(x, y) {
        this.pos.set(x, y);
    }

    updateFOV(fov) {
        this.fov = fov;
        this.rays = [];
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.step) {
            this.rays.push( new Ray(this.pos, radians(a) + this.heading));
        }
    }

    look(walls) {
        const scene = [];
        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    let d = p5.Vector.dist(this.pos, pt);
                    const a = ray.dir.heading() - this.heading;
                    d *= cos(a);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                stroke(255, 100);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
            scene[i] = record;
        }
        return scene;
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays) {
            ray.show();
        }
    }
}
