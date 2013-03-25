# EskyLib

NOTE: WORK IN PROGRESS

EskyLib is a container for setting up a THREE.js scene, controls, and setup/draw/logic functions in a quick and convenient way.

See the demo in /demo for an example of how to use EskyLib.

* Source: [https://github.com/AdamJohnBurns/EskyLib](https://github.com/AdamJohnBurns/EskyLib)
* Twitter: [@adamjohnburns](https://twitter.com/adamjohnburns)


## Requirements

* [jQuery](https://github.com/jquery/jquery) (or [Zepto](https://github.com/madrobby/zepto)), [THREE.js](https://github.com/mrdoob/three.js), and the included RequestAnimFrame.js
* A modern browser that supports THREE.js rendering


## How to use

To use, create a new Eskylib() object with the below required variables in object form.
Once initialized, the logic/drawing loop will run using the the browsers RequestAnimFrame function, or the provided shim as a fallback.

* Get the latest version of [THREE.js](https://github.com/mrdoob/three.js)
* Make sure Three.js is included in your project
* Setup the following:
** A container div with an ID
** A Javascript function for your logic loop
** A Javascript function for your rendering loop
* On project startup, call
	var eskyLib = new EskyLib({
		container: '#container',
		drawLoopFunction: drawFuncion,
		logicLoopFunction: logicFunction
	});
** There are other optional arguments, as listed below


## Constructor Arguments 

Required constructor arguments:
* container, string, jQuery selector of container DOM object to use for drawing
* drawFunction, function, External drawing function, called each game loop
* logicFunction, function, External logic function, called each game loop

Optional constructor arguments:
* setupFunction, function, Runs once at startup to initialize the scene
* canvasWidth, integer, Width of area to render, in pixels
* canvasHeight, integer, Height of area to render, in pixels
* clearColour, string, Colour to use to clear the drawing area each frame in the hex format 0x000000


## Contributing

Anyone and everyone is welcome to contribute.
