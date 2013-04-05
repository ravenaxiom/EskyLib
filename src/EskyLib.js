/*****************************************************************************

    EskyLib.js
    ----------

    See README.md for documentation

*****************************************************************************/


var EskyLib = function (args) {
    'use strict';
    var self = this;

    try {
        // initialize the class
        self.initializeVariables();
        self.parseArguments(args);
        self.setupRendering();
        self.setupControls();

        // setup the user scene and start the render loop
        self.runSetupFunction();
        self.startDrawingLogicLoop();
    } catch (exception) {
        console.error("EskyLib Exception: " + exception);
    }
};


EskyLib.prototype.initializeVariables = function () {
    'use strict';
    var self = this;

    self.container = undefined;                 // DOM object container (div)

    self.setupFunction = undefined;            // function for setting up the scene, runs one at startup
    self.drawLoopFunction = undefined;         // function for drawing
    self.logicLoopFunction = undefined;        // function for logic

    self.clearColour = 0x000000;                // screen clear colour

    self.isFullscreen = false;
    self.canvasWidth = 0;                             // camera setup
    self.canvasHeight = 0;
    self.VIEW_ANGLE = 45;
    self.ASPECT = 0;
    self.NEAR = 0.1;
    self.FAR = 10000;

    self.renderer = undefined;                  // scene variables
    self.camera = undefined;
    self.scene = undefined;

    self.isPlaying = true;                      // set to false to pause logic but continue drawing

    self.mouseX = 0;                            // mouse variables
    self.mouseY = 0;
    self.mouseClicked = false;

    self.leftPressed = false;                   // keyboard variables
    self.rightPressed = false;
    self.upPressed = false;
    self.downPressed = false;

    self.fpsControls = undefined;               // fps controls (mouse + keyboard look and move)
};


EskyLib.prototype.parseArguments = function (args) {
    'use strict';
    var self = this;

    // make sure we have arguments to parse
    if (args) {
        self.parseRequiredArguments(args);
        self.parseOptionalArguments(args);
    } else {
        throw "No arguments provided";
    }
};


EskyLib.prototype.parseRequiredArguments = function (args) {
    'use strict';
    var self = this;

    // parse required arguments, throw an error if not provided

    // find the containing dom element
    if (args.container) {
        self.container = $(args.container);

        if ((self.container === typeof (undefined)) || (self.container.length <= 0)) {
            throw "Couldn't find container: " + args.container;
        }
    } else {
        throw "No container specified.";
    }

    // set the callback functions to use for drawing and logic
    if (args.drawLoopFunction) {
        self.drawLoopFunction = args.drawLoopFunction;
    } else {
        throw "No draw function specified.";
    }
};


EskyLib.prototype.parseOptionalArguments = function (args) {
    'use strict';
    var self = this;

    // parse optional arguments, no error if they don't exist

     // set the callback function for scene setup
    if (args.setupFunction) {
        self.setupFunction = args.setupFunction;
    }

    // callback function for logic loop
    if (args.logicLoopFunction) {
        self.logicLoopFunction = args.logicLoopFunction;
    }

    // set the canvas size
    if ((args.canvasWidth) && (args.canvasHeight)) {
        self.canvasWidth = args.canvasWidth;
        self.canvasHeight = args.canvasHeight;
    } else {
        self.canvasWidth = 800;
        self.canvasHeight = 600;
    }

    // set the screen clear colour
    if (args.clearCol !== typeof 'undefined') {
        self.clearColour = args.clearCol;
    } else {
        self.clearColour = 0x000000;
    }

    // flag for fullscreen display
    if ((args.isFullscreen !== typeof 'undefined') && (args.isFullscreen)) {
        self.isFullscreen = args.isFullscreen;
        self.canvasWidth = window.innerWidth;
        self.canvasHeight = window.innerHeight;
    } else {
        self.isFullscreen = false;
    }
};


// setup controls for use
EskyLib.prototype.setupControls = function () {
    'use strict';
    var self = this;

    $(document).keyup(function (event) {
        var key = event.which;

        if (key === 37) {
            self.leftPressed = false;
        } else if (key === 39) {
            self.rightPressed = false;
        } else if (key === 38) {
            self.upPressed = false;
        } else if (key === 40) {
            self.downPressed = false;
        }
    });

    // pause canvas on click
    $("*").mousedown(function () {
        self.mouseClicked = true;
    });

    $("*").mouseup(function () {
        self.mouseClicked = false;
    });

    // keep track of mouse coordinates
    $(document).mousemove(function (e) {
        //if(this.isPlaying) {
        self.mouseX = e.pageX;
        self.mouseY = e.pageY;
        //}
    });
};


/* setup THREE for rendering */
EskyLib.prototype.setupRendering = function () {
    'use strict';
    var self = this;

    self.ASPECT = self.canvasWidth / self.canvasHeight;

    // scene element setup
    self.renderer = new THREE.WebGLRenderer();
    self.camera = new THREE.PerspectiveCamera(self.VIEW_ANGLE, self.ASPECT, self.NEAR, self.FAR);
    self.scene = new THREE.Scene();

    // add camera to scene
    self.scene.add(self.camera);

    // pull camera back
    self.camera.position.z = 300;

    // setup renderer size
    self.renderer.setSize(self.WIDTH, self.HEIGHT);

    // get the dom element and replace the 'viewport-container' with it
    self.container.append(self.renderer.domElement);

    // setup pointer lock controls (click to enable first person camera mode)
    self.controls = new THREE.PointerLockControls(self.camera);

    self.controls.movementSpeed = 5;
    self.controls.lookSpeed = 0.005;
    self.controls.noFly = false;
    self.controls.lookVertical = true;
    self.controls.activeLook = false;

    if (self.controls === typeof undefined) {
        throw "Couldn't setup pointer lock controls";
    }
};


/* Run the provided setup function */
EskyLib.prototype.runSetupFunction = function () {
    'use strict';
    var self = this;

    if (self.setupFunction) {
        self.setupFunction();
    }
};


/* Initialize the main drawing loop, nothing will be drawn until this starts */
EskyLib.prototype.startDrawingLogicLoop = function () {
    'use strict';
    var self = this;

    window.requestAnimationFrame(self.drawingLogicLoop.bind(self));
};


/* Main logic/drawing loop */
EskyLib.prototype.drawingLogicLoop = function () {
    'use strict';
    var self = this;

    /*if (self.mouseClicked === true) {
        self.controls.activeLook = true;
    } else {
        self.controls.activeLook = false;
    }

    // update FPS controls
    self.controls.update(0.2);                               
*/
    // run the external draw/logic loops
    if (self.logicLoopFunction) {
        self.logicLoopFunction();
    }
    self.drawLoopFunction();

    // render the scene
    self.renderer.render(self.scene, self.camera);

    // request the next frame
    window.requestAnimationFrame(self.drawingLogicLoop.bind(self));
};