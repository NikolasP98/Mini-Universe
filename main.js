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
		radius: 10,
	});

	planet.spawnMoon({ amt: 1 });
};

const setup = () => {
	ctx.translate(canvas.width / 2, canvas.height / 2);
	generatePlanet();
	window.requestAnimationFrame(animate);
};

const animate = () => {
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
