$(document).ready(function () {
	var eskyLib = new EskyLib({
		container: '#myContainer',
		canvasWidth: 600,
		canvasHeight: 400,
		setupFunction: setup,
		drawLoopFunction: render,
		logicLoopFunction: logic
	});
});


function setup () {
	// setup the scene
	console.log('setup');
}

function render () {
	// put your scene 
	console.log('render');
}


function logic () {
	// put your scene logic here
	console.log('logic');
}