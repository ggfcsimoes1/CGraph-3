/*global THREE, requestAnimationFrame, console*/

var cameras = [];

//Clock creation
var clock = new THREE.Clock();

var scene, renderer, currentCamera;

var sphereRadius = 300;

var cameraRadius = sphereRadius * 1.9

/*Colors that will be used in the materials
Respectively, blue, cyan, magenta, yellow, green*/
var colors = [0x0000FF,0x00FFFF,0xFF00FF,0xFFFF00, 0x00FF00];

//auxiliary object that holds the pressed 
//status of every key used in the program
let keys = {
    leftArrow : false,
    rightArrow : false,
    upArrow : false,
    downArrow : false
}

/*Function responsible for creating all the objects and scene*/
function createScene() {
    'use strict';

    scene = new THREE.Scene ( ) ;

    planet = new Planet ( 0,0,0, sphereRadius, 30, 30, colors );
    ship = new Ship(THREE.MathUtils.degToRad(Math.random() * 360), THREE.MathUtils.degToRad(Math.random() * 360), sphereRadius*1.2, sphereRadius/10, 8, colors, cameraRadius); // -------------Fix height
    trash = new Trash( sphereRadius*1.2, sphereRadius/24, sphereRadius/20, 20);

    scene.add(planet.getGroup());
    scene.add(ship.getGroup());
    scene.add(trash.getGroup());

}

/*Function responsible for changing the position of the camera*/
function createCamera() {
    'use strict';

    var camera = new THREE.OrthographicCamera(  window.innerWidth / - 2, 
                                                window.innerWidth / 2, 
                                                window.innerHeight / 2, 
                                                window.innerHeight / - 2, 
                                                1, 
                                                10000 );
    camera.position.set( 0, 0, 1000 );
    camera.lookAt( scene.position );
    cameras.push( camera );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set( 0, 0, 1000 );
    camera.lookAt( scene.position );
    cameras.push( camera );

    currentCamera = cameras[0];
}

/*Function that handles the change of the camera*/
function changePerspective(view){
    'use strict';
    switch(view){
        case "orthographic":
            currentCamera = cameras[0];
            currentCamera.lookAt(scene.position);
            break;
        case "perspective":
            currentCamera = cameras[1];
            currentCamera.lookAt(scene.position);
            break;
        case "ship":
            currentCamera = ship.getCamera()
            currentCamera.lookAt(scene.position);
            break;
    }

}

/*Function responsible for toggle the wireframe*/
function toggleWireframe(){
    'use strict'
    scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.wireframe = !node.material.wireframe;
        }
    });
}

/*Event occurs when the browser window has been resized*/
function onResize() {
    'use strict';
    
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        currentCamera.left = window.innerWidth / -2;
        currentCamera.right = window.innerWidth / 2;
        currentCamera.top = window.innerHeight / 2;
        currentCamera.bottom = window.innerHeight / -2;
        currentCamera.updateProjectionMatrix();
    }
}

/*Detect if the following keys are down*/
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
    case 49: //user pressed key 1, toggling normal view
        changePerspective("orthographic");  
        console.log("orthographic view");  
        break;
    case 50: //user pressed key 2
        changePerspective("perspective");
        console.log("perspective view");
        break;
    case 51: //user pressed key 3
        changePerspective("ship");
        console.log("ship view");
        break;
    case 52:
        toggleWireframe();
        console.log("wireframe view");
        break;
    case 37: //left arrow
        keys.leftArrow = true
        console.log("Left arrow key press");
        break;
    case 38: //up arrow
        keys.upArrow = true
        //ship.setRotX(THREE.MathUtils.degToRad(-90));
        console.log("Up arrow key press"); 
        break;
    case 39: //right arrow
        keys.rightArrow = true
        console.log("Right arrow key press"); 
        break;
    case 40: //down arrow
        keys.downArrow = true
        //ship.setRotX(THREE.MathUtils.degToRad(90));
        console.log("Down arrow key press");
        break;  
    }
}

/*Detect if the following keys are up*/
function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {
    case 37: //left arrow
        keys.leftArrow = false;
        break;
    case 38: //up arrow
        keys.upArrow = false;
        break;
    case 39: //right arrow
        keys.rightArrow = false;
        break;
    case 40: //down arrow
        keys.downArrow = false;
        break;
    }
}

/*Function responsible for managing the movements*/
function checkForMovements() {
    'use strict';

    //Get current time
    var delta = clock.getDelta();

    if ( keys.upArrow && keys.rightArrow)
        ship.moveObject( "up_right", delta);
    else if (keys.downArrow && keys.rightArrow)
        ship.moveObject( "down_right", delta);
    else if (keys.upArrow && keys.leftArrow)
        ship.moveObject( "up_left", delta);
    else if (keys.downArrow && keys.leftArrow)
        ship.moveObject( "down_left", delta);
    else if ( keys.leftArrow )
        ship.moveObject( "left", delta);
    else if ( keys.rightArrow )
        ship.moveObject( "right", delta);
    else if ( keys.upArrow )
        ship.moveObject( "up", delta);
    else if ( keys.downArrow )
        ship.moveObject( "down", delta);

    
}

/*Auxiliary function to check if the ship collides with respective trash object*/
function wasCollision(obj1, ship){
    obj1Position = obj1.getObj3D().position;
    shipPosition = ship.getGroup().position;

    //Sphere - sphere collission detection
    return  ( obj1.getBoundaryRadius() + ship.getBoundaryRadius() ) ** 2 >= 
            (obj1Position.x - shipPosition.x) ** 2 + 
            (obj1Position.y - shipPosition.y) ** 2 + 
            (obj1Position.z - shipPosition.z) ** 2;
}

/*Function responsible to check collisions*/
function checkForCollisions(){
    let quadrant;
    const shipObj = ship.getGroup();
    if(shipObj.position.y >= 0) {
        if(shipObj.position.x >=0) {
            quadrant = trash.quadrants["north-east"];
        } else {
            quadrant = trash.quadrants["north-west"];
        }
    } else {
        if(shipObj.position.x >=0) {
            quadrant = trash.quadrants["south-east"];
        } else {
            quadrant = trash.quadrants["south-west"];
        }
    }

    //Iterate every thrash object according to the quadrant where the ship is located
    for ( i = 0; i < quadrant.length; i++ ) {
        if ( wasCollision(quadrant[i], ship) ){
            console.log("collision");
            quadrant[i].getMesh().visible = false;

            //Remove trash object from the array
            quadrant.splice(i, 1);
            console.log(quadrant.length);
        }
    } 
}

/*Shows the output in the browser according to the camera*/
function render() {
    'use strict';
    renderer.render(scene, currentCamera);
}

/*Main program*/
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        logarithmicDepthBuffer: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

/*Function responsible for animation effects*/
function animate() {
    requestAnimationFrame( animate );    
    render();
    checkForMovements();
    checkForCollisions();
}