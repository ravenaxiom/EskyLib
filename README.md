# EskyLib

EskyLib is a base Javascript framework for Three.js WebGL projects. Please note this is currently a work in progress and is not yet in a usable state.

* Source: [https://github.com/AdamJohnBurns/EskyLib](https://github.com/AdamJohnBurns/EskyLib)
* Twitter: [@adamjohnburns](https://twitter.com/adamjohnburns)


## How to use

* Get the latest version of [Three.js](https://github.com/mrdoob/three.js)
* Make sure Three.js is included in your project
* Setup the following:
** A container div with an ID
** A Javascript function for your logic loop
** A Javascript function for your rendering loop
* On project startup, call
	var eskyLib = new EskyLib({
		containerSelector: '#container',
		drawFunction: drawFuncion,
		logicFunction: logicFunction,
		framesPerSecond: 60
	});


## Documentation	

* Constructor options:
** Container
** drawFunction
** logicFunction
** framesPerSecond


## Contributing

Anyone and everyone is welcome to contribute.
