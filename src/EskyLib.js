/*****************************************************************************

    EskyLib-0.3
    -----------

    A container for setting up a THREE.js scene, controls, and draw/logic loops.

    To use, create a new Eskylib() object with all the below variables.
    Then call Eskylib.startDrawing() to begin the draw/logic loops.


    Takes the following arguments:
        container           ID of container to use for drawing
        width               Width of area to render, in pixels
        height              Height of area to render, in pixels
        drawFunc            External drawing function, called each game loop
        logicFunc           External logic function, called each game loop
        clearColour         Colour to use to clear the drawing area each frame   

*****************************************************************************/


var EskyLib = function(container, width, height, drawLoopFunc, logicLoopFunc, clearCol) {

    this.container = undefined;                 // DOM object container (div)

    this.drawLoopFunction = undefined;          // function for drawing
    this.logicLoopFunction = undefined;         // function for logic

    this.clearColour = 0x000000;                // screen clear colour

    this.WIDTH = 0;                             // camera setup
    this.HEIGHT = 0;
    this.VIEW_ANGLE = 45;
    this.ASPECT = 0; 
    this.NEAR = 0.1;
    this.FAR = 10000;

    this.renderer = undefined;                  // scene variables
    this.camera = undefined;
    this.scene = undefined;

    this.isPlaying = true;                      // set to false to pause logic but continue drawing

    this.mouseX = 0;                            // mouse variables
    this.mouseY = 0;
    this.mouseClicked = false;

    this.leftPressed = false;                   // keyboard variables
    this.rightPressed = false;
    this.upPressed = false;
    this.downPressed = false;

    this.fpsControls = undefined;               // fps controls (mouse + keyboard look and move)


    // find the containing dom element
    if(container) {
        this.container = $(container);
    } else {
        throw "No container specified.";
    }

    // set the canvas size
    if(width && height) {
        this.WIDTH = width;
        this.HEIGHT = height;
    } else {
        throw "No canvas size specified.";
    }

    // set the functions to use for drawing and logic
    if(drawLoopFunc) {
        this.drawLoopFunction = drawLoopFunc;
    } else {
        throw "No draw function specified.";
    }

    if(logicLoopFunc) {
        this.logicLoopFunction = logicLoopFunc;
    } else {
        throw "No logic function specified.";
    }

    // set the clear colour
    if(clearCol) {
        this.clearColour = clearCol;
    }
    else {
        this.clearColour = 0x000000;
    }


    try {  
        this.setupDrawing();                                                   
        this.setupControls();

        //this.startDrawing();
    }
    catch (error) {
        throw "Eskylib Exception: " + error;
    }
};


// setup controls for use
EskyLib.prototype.setupControls = function() {
    $(document).keyup(function(event) {
        var key = event.which;

        if(key == 37) {
            this.leftPressed = false;
        }
        else if(key == 39) {
            this.rightPressed = false;
        }
        else if(key == 38) {
            this.upPressed = false;
        }
        else if(key == 40) {
            this.downPressed = false;
        }
    });

    // pause canvas on click
    $("*").mousedown(function() {
        this.mouseClicked = true;
    });

    $("*").mouseup(function() {
        this.mouseClicked = false;
    });

    // keep track of mouse coordinates
    $(document).mousemove(function(e) {
        //if(this.isPlaying) {
            this.mouseX = e.pageX;
            this.mouseY = e.pageY;
        //}
    });
}



// setup canvas for drawing
EskyLib.prototype.setupDrawing = function() {

    this.ASPECT = this.WIDTH / this.HEIGHT;

    // scene element setup
    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.ASPECT, this.NEAR, this.FAR);
    this.scene = new THREE.Scene();

    // add camera to scene
    this.scene.add(this.camera);

    // pull camera back
    this.camera.position.z = 300;

    // setup renderer size
    this.renderer.setSize(this.WIDTH,this.HEIGHT);

    // get the dom element and replace the 'viewport-container' with it
    this.container.append(this.renderer.domElement);

    this.controls = new THREE.FirstPersonControls(this.camera);

    this.controls.movementSpeed = 5;
    this.controls.lookSpeed = 0.005;
    this.controls.noFly = false;
    this.controls.lookVertical = true;
    this.controls.activeLook = false;

    if(this.controls === undefined) {
        throw "Controls error!!";
    }
}



// nothing will be drawn until this starts
EskyLib.prototype.startDrawing = function() {
    // setup draw loop
    //setInterval(this.draw, 10);


}



EskyLib.prototype.requestFrame =  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());



// main loop
EskyLib.prototype.draw = function() {

   // if(this.container) {

        /*if(this.mouseClicked) {
            this.controls.activeLook = true;
        } 
        else {
            this.controls.activeLook = false;
        }*/

       //this.controls.update(0.2);                               // update FPS controls

    //    this.logicLoopFunction();
    //    this.drawLoopFunction();
console.log(this);
        this.renderer.render(this.scene, this.camera);      // render the scene
  /*  }
    else {
        throw new Error("Error: undefined context");
    }*/

    this.requestFrame(this.draw); 
}

