import * as PIXI from 'pixi.js';

export default class Planet extends PIXI.Sprite {
	constructor({
		x = 100,
		y = 100,
		radius = 20,
		speed = 0,
		texture,
		distance = 0,
	}) {
		super(texture);
		this.anchor.set(0.5);
		this.radius = radius;
		this.width = this.radius * 2;
		this.height = this.radius * 2;
		this.theta = 0;

		this.moons = [];

		this.x = x;
		this.y = y;
		this.center = new PIXI.Point(this.x, this.y);

		this.speed = speed;

		this.distance = distance * (Math.random() * 300 + 100);

		// this.alpha = 0.9;
	}

	spawnMoon({ app, amt = 1, level = 1 }) {
		for (let i = 0; i < amt; i++) {
			// Load Texture
			const moonTexture = app.loader.resources['planet02'].texture;

			// Generate coordinates
			const rVar = this.radius / 2;
			const sVar = Math.random() / 2;

			const moon = new Planet({
				x: this.x + this.distance,
				y: this.y,
				radius: rVar,
				speed: sVar,
				texture: moonTexture,
				distance: 1 / level,
			});
			this.moons.push(moon);
			if (level < 2) {
				moon.spawnMoon({ app, amt: 1, level: level + 1 });
			}
		}
	}

	orbit() {
		if (this.speed > 0) {
			this.theta += this.speed;
			const piRatio = Math.PI / 180;

			// ! MOONS ARE ORBITTING AROUND A FIXED POINT

			this.x =
				Math.cos(this.theta * piRatio) * this.distance + this.center.x;
			this.y =
				Math.sin(this.theta * piRatio) * this.distance + this.center.y;
		}

		if (this.moons.length > 0) {
			this.moons.forEach((moon) => {
				moon.orbit();
			});
		}
	}

	update(app) {
		this.orbit();
		this.draw(app);
	}

	draw(app) {
		// Draw the planet
		app.stage.addChild(this);

		// Draw the moons, if any exist, recursively
		if (this.moons.length > 0) {
			this.moons.forEach((moon) => {
				moon.draw(app);
			});
		}
	}
}
