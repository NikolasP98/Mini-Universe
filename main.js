import Planet from './classes/planet';

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

let planet;

const mouse = {
	x: null,
	y: null,
	radius: 10,
};

const generatePlanet = () => {
	planet = new Planet({
		radius: 20,
	});

	planet.spawnMoon({ amt: 3 });
};

const setup = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.translate(canvas.width / 2, canvas.height / 2);
	generatePlanet();
	window.requestAnimationFrame(animate);
};

const animate = () => {
	ctx.clearRect(
		-canvas.width,
		-canvas.height,
		canvas.width * 2,
		canvas.height * 2
	);

	planet.update();
	window.requestAnimationFrame(animate);
};

/* ---------------------------
   ----- EVENT LISTENERS -----
   --------------------------- */

// run setup function
window.onload = () => {
	setup();
};

// change canvas size as browser window resizes
window.addEventListener('resize', () => {
	setup();
});

// add planet to clicked coordinate
canvas.addEventListener('click', (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});
