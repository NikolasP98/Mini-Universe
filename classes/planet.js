import { ctx } from '../main';
import Vector from './vector';
import { ellipse } from './shapes';
export default class Planet {
	constructor({
		x = 0,
		y = 0,
		radius = 20,
		distance = 30,
		speed = 0,
		center = new Vector(),
	}) {
		this.position = new Vector(x, y);
		this.center = center;
		this.speed = speed;

		this.radius = radius;

		this.theta = 0;

		this.color = 'white';

		this.moons = [];

		this.distance = distance * (Math.random() * 200 + 100);

		this.showLines = true;
	}

	spawnMoon({ amt = 1, level = 1 }) {
		for (let i = 0; i < amt; i++) {
			// Generate coordinates
			const rVar = this.radius / 2;
			const sVar = (Math.random() * level) / 2 + 0.1;

			const moon = new Planet({
				x: this.position.x + this.distance,
				y: this.position.y,
				radius: rVar,
				distance: 1 / level,
				speed: sVar,
				center: this.position,
			});
			this.moons.push(moon);
			if (level < 3) {
				moon.spawnMoon({ amt, level: level + 1 });
			}
		}
	}

	orbit() {
		if (this.speed > 0) {
			this.theta += this.speed;
			const piRatio = Math.PI / 180;

			this.position.x =
				Math.cos(this.theta * piRatio) * this.distance + this.center.x;
			this.position.y =
				Math.sin(this.theta * piRatio) * this.distance + this.center.y;
		}

		if (this.moons.length > 0) {
			this.moons.forEach((moon) => {
				moon.orbit();
			});
		}
	}

	drawLine(x, y, x2, y2) {
		ctx.strokeStyle = 'rgba(255,0,0)';
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}

	draw() {
		if (this.moons.length > 0) {
			this.moons.forEach((moon) => {
				moon.draw();
			});
		}

		if (this.showLines) {
			this.drawLine(
				this.position.x,
				this.position.y,
				this.center.x,
				this.center.y
			);
		}

		ctx.fillStyle = this.color;
		ctx.strokeStyle = 'rgba(0,0,0)';
		ellipse(this.position.x, this.position.y, this.radius);
	}

	update() {
		this.orbit();
		this.draw();
	}
}
