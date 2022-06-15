import * as PIXI from 'pixi.js';
import Planet from './classes/planet';

let app;
let planet;

window.onload = () => {
	// Create a Pixi Application
	app = new PIXI.Application({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	document.body.appendChild(app.view);

	// LOAD ALL ASSETS
	app.loader.baseUrl = 'assets/';
	app.loader
		.add('planet01', 'planet01.png')
		.add('planet02', 'planet02.png')
		.add('planet03', 'planet03.png');

	app.loader.onComplete.add(doneLoading);
	app.loader.load();
};

// When all assets are loaded, start the game
const doneLoading = () => {
	// Generate the planet
	generatePlanet();

	// Start the game loop
	app.ticker.add(update);
};

const generatePlanet = () => {
	const texture = app.loader.resources['planet01'].texture;
	const cScreen = new PIXI.Point(app.screen.width / 2, app.screen.height / 2);

	planet = new Planet({
		radius: 50,
		texture,
		x: cScreen.x,
		y: cScreen.y,
	});

	planet.spawnMoon({ app, amt: 1 });
};

const update = (delta) => {
	planet.update(app);
};
