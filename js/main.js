/*global THREE, requestAnimationFrame, console*/
var cameras = [];

//Clock creation
var clock = new THREE.Clock();

var controls;

var scene, renderer, currentCamera;

var mesh1, mesh2, mesh3;

/*Colors that will be used in the materials
Respectively, blue, cyan, magenta, yellow, green*/
var colors = [0x0000FF,0x00FFFF,0xFF00FF,0xFFFF00, 0x00FF00, 0x0AB920, 0xF79573];

//auxiliary object that holds the pressed 
//status of every key used in the program
let keys = {
    Q : false,
    W : false,
    E : false,
    R : false,
    T : false,
    Y : false
    /* leftArrow : false,
    rightArrow : false,
    upArrow : false,
    downArrow : false */
}

/*Function responsible for creating all the objects and scene*/
function createScene() {
    'use strict';

    scene = new THREE.Scene ( ) ;

    plane = new Plane(0, -3, 0, 1000, 1000, colors[6]);
    palanque = new Palanque(0, 0, 0, 200, 400, 400, colors[5]);

    let geometry = new THREE.BufferGeometry();
    
    let vertices = new Float32Array( [
        0, 0, 0,
        0, 100, 0,
        50,  50,  20,

        0, 0, 0,
        0, 100, 0,
        -50, 50, 20
    ] );

    
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    mesh1 = new THREE.Mesh( geometry, material );
    mesh1.position.set(-200, 200, 0);

    geometry = new THREE.BufferGeometry();
    
    let vertices1 = new Float32Array( [
        0, 0, 0,
        0, 100, 0,
        17,  80,  5,

        0, 0, 0,
        0, 100, 0,
        -17,  80,  5,

        0, 0, 0,
        -17,  80,  5,
        -2,  75,  3,

        0, 0, 0,
        17,  80,  5,
        2,  75,  3,

        0, 0, 0,
        15.5,  70,  5,
        2,  75,  3,

        0, 0, 0,
        -15.5,  70,  5,
        -2,  75,  3,

        0, 0, 0,
        15.5,  70,  5,
        2,  70,  -1,

        0, 0, 0,
        -15.5,  70,  5,
        -2,  70,  -1,
    ] );

    
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices1, 3 ) );
    material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    mesh2 = new THREE.Mesh( geometry, material );
    mesh2.position.set(200, 200, 0);


    geometry = new THREE.BufferGeometry();
    
    let vertices2 = new Float32Array( [
        //face--
        0, 11, 0,
        6.5, 0, 3,
        27,  15,  1,

        6.5, 0, 3,
        27,  15,  1,
        23, 0, 4,
        //face--
        0, 11, 0,
        6.5, 0, -3,
        27,  15,  -1,

        6.5, 0, -3,
        27,  15, -1,
        23, 0, -4,
        //face--
        0, 11, 0,
        6.5, 0, 3,
        27,  15,  1,

        6.5, 0, 3,
        27,  15,  1,
        36.5, 1, 4,
        //face--
        0, 11, 0,
        6.5, 0, -3,
        27,  15,  -1,

        6.5, 0, -3,
        27,  15,  -1,
        36.5, 1, -4,
        //face--
        0, 11, 0,
        6.5, 0, 3,
        51,  19,  0,

        6.5, 0, 3,
        51,  19,  0,
        36.5, 1, 4,
        //face--
        0, 11, 0,
        6.5, 0, -3,
        51,  19,  0,

        6.5, 0, -3,
        51,  19,  0,
        36.5, 1, -4,
        //face--
        0, 11, 0,
        6.5, 0, 3,
        21.5, 33, 0.5,

        0, 11, 0,
        20, 34.5, 0,
        21.5, 33, 0.5,
        //face--
        0, 11, 0,
        6.5, 0, -3,
        21.5, 33, -0.5,

        0, 11, 0,
        20, 34.5, 0,
        21.5, 33, -0.5,
        //face--
        3, 28.3, 0,
        20, 34.5, 0,
        21.5, 33, 0.5,

        //face--
        3, 28.3, 0,
        20, 34.5, 0,
        21.5, 33, -0.5,
        
    ] );

    
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices2, 3 ) );
    material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    mesh3 = new THREE.Mesh( geometry, material );
    mesh3.position.set(0, 200, 0);


    scene.add(mesh1);
    scene.add(mesh2);
    scene.add(mesh3);
    scene.add(plane.getMesh());
    scene.add(palanque.getGroup());

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
    camera.position.set( 0, 0, 500 );
    camera.lookAt( scene.position );
    cameras.push( camera );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set( 1000, 1000, 1000 );
    camera.lookAt( scene.position );
    cameras.push( camera );

    currentCamera = cameras[1];
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
        changePerspective("perspective");
        console.log("perspective view");
        break;
    case 50: //user pressed key 2
        changePerspective("orthographic");  
        console.log("orthographic view"); 
        break;
    case 52:
        toggleWireframe();
        console.log("wireframe view");
        break;
    case 81: //Q
        keys.Q = true;
        break;
    case 87: //W
        keys.W = true;
        break;
    case 69: //E
        keys.E = true;
        break;
    case 82: //R
        keys.R = true;
        break;
    case 84: //T
        keys.T = true;
        break;
    case 89: //Y
        keys.Y = true;
        break;


    /* case 37: //left arrow
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
        break;   */
    }
}

/*Detect if the following keys are up*/
function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {
        case 81: //Q
            keys.Q = false;
            break;
        case 87: //W
            keys.W = false;
            break;
        case 69: //E
            keys.E = false;
            break;
        case 82: //R
            keys.R = false;
            break;
        case 84: //T
            keys.T = false;
            break;
        case 89: //Y
            keys.Y = false;
            break;
    /* case 37: //left arrow
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
        break; */
    
    }
}

/*Function responsible for managing the movements*/
function checkForMovements() {
    'use strict';

    //Get current time
    var delta = clock.getDelta();

    if (keys.Q)
        mesh1.rotateY(THREE.MathUtils.degToRad(-delta*40));
    else if (keys.W)
        mesh1.rotateY(THREE.MathUtils.degToRad(delta*40));
    else if (keys.E)
        mesh2.rotateY(THREE.MathUtils.degToRad(-delta*40));
    else if (keys.R)
        mesh2.rotateY(THREE.MathUtils.degToRad(delta*40));
    else if (keys.T)
        mesh3.rotateY(THREE.MathUtils.degToRad(-delta*40));
    else if (keys.Y)
        mesh3.rotateY(THREE.MathUtils.degToRad(delta*40));

    
}

/* Auxiliary function to check if the ship collides with respective trash object
function wasCollision(obj1, ship){
    obj1Position = obj1.getObj3D().position;
    shipPosition = ship.getGroup().position;

    //Sphere - sphere collission detection
    return  ( obj1.getBoundaryRadius() + ship.getBoundaryRadius() ) ** 2 >= 
            (obj1Position.x - shipPosition.x) ** 2 + 
            (obj1Position.y - shipPosition.y) ** 2 + 
            (obj1Position.z - shipPosition.z) ** 2;
} */

/*Function responsible to check collisions*/
/* function checkForCollisions(){
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
} */

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
    controls = new THREE.OrbitControls(currentCamera, renderer.domElement);
    controls.update();

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
    controls.update();
}