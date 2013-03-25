/*****************************************************************************

    EskyLib.js
    ----------

    See README.md for documentation

*****************************************************************************/


var EskyLib = function (args) {
    'use strict';
    var _this = this;

    try {
        // initialize the class
        _this.initializeVariables();
        _this.parseArguments(args);
        _this.setupRendering();
        _this.setupControls();

        // setup the user scene and start the render loop
        _this.runSetupFunction();
        _this.startDrawingLogicLoop();
    } catch (exception) {
        console.error("EskyLib Exception: " + exception);
    }
};


EskyLib.prototype.initializeVariables = function () {
    'use strict';
    var _this = this;

    _this.container = undefined;                 // DOM object container (div)

    _this.setupFunction = undefined;            // function for setting up the scene, runs one at startup
    _this.drawLoopFunction = undefined;         // function for drawing
    _this.logicLoopFunction = undefined;        // function for logic

    _this.clearColour = 0x000000;                // screen clear colour

    _this.canvasWidth = 0;                             // camera setup
    _this.canvasHeight = 0;
    _this.VIEW_ANGLE = 45;
    _this.ASPECT = 0;
    _this.NEAR = 0.1;
    _this.FAR = 10000;

    _this.renderer = undefined;                  // scene variables
    _this.camera = undefined;
    _this.scene = undefined;

    _this.isPlaying = true;                      // set to false to pause logic but continue drawing

    _this.mouseX = 0;                            // mouse variables
    _this.mouseY = 0;
    _this.mouseClicked = false;

    _this.leftPressed = false;                   // keyboard variables
    _this.rightPressed = false;
    _this.upPressed = false;
    _this.downPressed = false;

    _this.fpsControls = undefined;               // fps controls (mouse + keyboard look and move)
};


EskyLib.prototype.parseArguments = function (args) {
    'use strict';
    var _this = this;

    // make sure we have arguments to parse
    if (args) {
        _this.parseRequiredArguments(args);
        _this.parseOptionalArguments(args);
    } else {
        throw "No arguments provided";
    }
};


EskyLib.prototype.parseRequiredArguments = function (args) {
    'use strict';
    var _this = this;

    // parse required arguments, throw an error if not provided

    // find the containing dom element
    if (args.container) {
        _this.container = $(args.container);

        if ((_this.container === typeof (undefined)) || (_this.container.length <= 0)) {
            throw "Couldn't find container: " + args.container;
        }
    } else {
        throw "No container specified.";
    }

    // set the callback functions to use for drawing and logic
    if (args.drawLoopFunction) {
        _this.drawLoopFunction = args.drawLoopFunction;
    } else {
        throw "No draw function specified.";
    }
};


EskyLib.prototype.parseOptionalArguments = function (args) {
    'use strict';
    var _this = this;

    // parse optional arguments, no error if they don't exist

     // set the callback function for scene setup
    if (args.setupFunction) {
        _this.setupFunction = args.setupFunction;
    }

    // callback function for logic loop
    if (args.logicLoopFunction) {
        _this.logicLoopFunction = args.logicLoopFunction;
    }

    // set the canvas size
    if ((args.canvasWidth) && (args.canvasHeight)) {
        _this.canvasWidth = args.canvasWidth;
        _this.canvasHeight = args.canvasHeight;
    } else {
        _this.canvasWidth = 800;
        _this.canvasHeight = 600;
    }

    // set the screen clear colour
    if (args.clearCol !== typeof 'undefined') {
        _this.clearColour = args.clearCol;
    } else {
        _this.clearColour = 0x000000;
    }
};


// setup controls for use
EskyLib.prototype.setupControls = function () {
    'use strict';
    var _this = this;

    $(document).keyup(function (event) {
        var key = event.which;

        if (key === 37) {
            _this.leftPressed = false;
        } else if (key === 39) {
            _this.rightPressed = false;
        } else if (key === 38) {
            _this.upPressed = false;
        } else if (key === 40) {
            _this.downPressed = false;
        }
    });

    // pause canvas on click
    $("*").mousedown(function () {
        _this.mouseClicked = true;
    });

    $("*").mouseup(function () {
        _this.mouseClicked = false;
    });

    // keep track of mouse coordinates
    $(document).mousemove(function (e) {
        //if(this.isPlaying) {
        _this.mouseX = e.pageX;
        _this.mouseY = e.pageY;
        //}
    });
};


/* setup THREE for rendering */
EskyLib.prototype.setupRendering = function () {
    'use strict';
    var _this = this;

    _this.ASPECT = _this.canvasWidth / _this.canvasHeight;

    // scene element setup
    _this.renderer = new THREE.WebGLRenderer();
    _this.camera = new THREE.PerspectiveCamera(_this.VIEW_ANGLE, _this.ASPECT, _this.NEAR, _this.FAR);
    _this.scene = new THREE.Scene();

    // add camera to scene
    _this.scene.add(_this.camera);

    // pull camera back
    _this.camera.position.z = 300;

    // setup renderer size
    _this.renderer.setSize(_this.WIDTH, _this.HEIGHT);

    // get the dom element and replace the 'viewport-container' with it
    _this.container.append(_this.renderer.domElement);

    //_this.controls = new THREE.FirstPersonControls(_this.camera);

   /* _this.controls.movementSpeed = 5;
    _this.controls.lookSpeed = 0.005;
    _this.controls.noFly = false;
    _this.controls.lookVertical = true;
    _this.controls.activeLook = false;

    if (_this.controls === typeof undefined) {
        throw "Couldn't setup controls";
    }*/

};


/* Run the provided setup function */
EskyLib.prototype.runSetupFunction = function () {
    'use strict';
    var _this = this;

    if (_this.setupFunction) {
        _this.setupFunction();
    }
};


/* Initialize the main drawing loop, nothing will be drawn until this starts */
EskyLib.prototype.startDrawingLogicLoop = function () {
    'use strict';
    var _this = this;

    window.requestAnimationFrame(_this.drawingLogicLoop);
};


/* Main logic/drawing loop */
EskyLib.prototype.drawingLogicLoop = function () {
    'use strict';
    var _this = this;

    if (_this.container) {
        /*if (_this.mouseClicked === true) {
            _this.controls.activeLook = true;
        } else {
            _this.controls.activeLook = false;
        }

        _this.controls.update(0.2);                               // update FPS controls
*/
 /*       if(_this.logicLoopFunction) {
            _this.logicLoopFunction();
        }*/
        //_this.drawLoopFunction();
        _this.renderer.render(_this.scene, _this.camera);      // render the scene
    } else {
        throw "Error: invalid container";
    }

    window.requestAnimationFrame(_this.drawingLogicLoop);
};