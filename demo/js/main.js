function setup () {
	// setup the scene
}

function render () {
	// put your scene 
}

function logic () {
	// put your scene logic here
}

$(document).ready(function () {
	var eskyLib = new EskyLib({
		container: '#myContainer',
		/*canvasWidth: 600,
		canvasHeight: 400,*/
		isFullscreen: true,
		setupFunction: setup,
		drawLoopFunction: render,
		logicLoopFunction: logic
	});
});