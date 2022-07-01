import { ctx } from '../main';
import Vector from './vector';
import { ellipse } from './shapes';
export default class Planet {
	constructor({ x = 0, y = 0, radius = 20, distance = 30 }) {
		this.position = new Vector(x, y);
		this.speed = new Vector();

		this.radius = radius;

		this.theta = 0;

		this.color = 'white';

		this.moons = [];

		// this.distance = distance * (Math.random() * 300 + 100);
		this.distance = distance + Math.random() * 30;
	}

	spawnMoon({ amt = 1, level = 1 }) {
		for (let i = 0; i < amt; i++) {
			// Generate coordinates
			const rVar = this.radius / 2;
			const sVar = Math.random() / 2;

			const moon = new Planet({
				x: this.position.x + this.distance,
				y: this.position.y,
				radius: rVar,
				distance: 1 / level,
			});
			this.moons.push(moon);
			if (level < 2) {
				moon.spawnMoon({ amt: 1, level: level + 1 });
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

	draw() {
		ctx.fillStyle = this.color;
		ctx.strokeStyle = 'rgba(0,0,0)';

		if (this.moons.length > 0) {
			this.moons.forEach((moon) => {
				moon.draw();
			});
		}

		ellipse(this.position.x, this.position.y, this.radius);
	}

	update() {
		// this.orbit();
		this.draw();
	}
}
