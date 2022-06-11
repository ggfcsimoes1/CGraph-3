/*global THREE, requestAnimationFrame, console, dat*/
var cameras = [];

//Clock creation
var clock = new THREE.Clock();

var controls;

var scene, renderer, currentCamera;

var mesh1, mesh2, mesh3;

var light, spotLight, spotLight2, spotLight3;

/*Colors that will be used in the materials
Respectively, blue, cyan, magenta, yellow, green*/
var colors = [0x0000FF,0x00FFFF,0xFF00FF,0xFFFF00, 0x00FF00, 0x0AB920, 0xF79573];

var material = [0, 0, 0, 0, 0];

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

    //---------------------------------Light---------------

    const color = 0xFFFFFF;
    const intensity = 1;
    light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 300, 150);
    light.target.position.set(0, 0, -100);

    const helper = new THREE.DirectionalLightHelper( light, 50 );
    scene.add( helper );

    spotLight = new THREE.SpotLight( color, 1, 0, Math.PI / 6, 1);
    spotLight.position.set( -130, 400, -100 );
    spotLight.target.position.set(-130, 0, -100);

    /* const helper1 = new THREE.SpotLightHelper( spotLight, 50);
    scene.add( helper1 ); */

    
    spotLight2 = new THREE.SpotLight( color, 1, 0, Math.PI / 6, 1);
    spotLight2.position.set( 0, 400, -100 );
    spotLight2.target.position.set(0, 0, -100);
    
    spotLight3 = new THREE.SpotLight( color, 1, 0, Math.PI / 6, 1);
    spotLight3.position.set( 100, 400, -100 );
    spotLight3.target.position.set(100, 0, -100);

    material[0] = new THREE.MeshPhongMaterial({ color: colors[1], side: THREE.DoubleSide });
    material[1] = new THREE.MeshPhongMaterial({ color: colors[2], side: THREE.DoubleSide });
    material[2] = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    material[3] = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    material[4] = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });


    const gui = new dat.GUI();
    gui.add(light, 'intensity', 0, 2, 0.01);
    gui.add(light.target.position, 'x', -1000, 1000);
    gui.add(light.target.position, 'z', -1000, 1000);
    gui.add(light.target.position, 'y', 0, 1000);

    //----------------------------------Plane & Palanque-------------

    plane = new Plane(0, -3, 0, 1000, 1000, material[0]);
    palanque = new Palanque(0, 0, 0, 200, 400, 400, material[1]);

    //---------------------------------Origamis------------------------

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
    geometry.computeVertexNormals();
    mesh1 = new THREE.Mesh( geometry, material[2] );
    mesh1.position.set(-130, 200, -100);

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
    geometry.computeVertexNormals();
    mesh2 = new THREE.Mesh( geometry, material[3] );
    mesh2.position.set(0, 200, -100);


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
    geometry.computeVertexNormals();
    mesh3 = new THREE.Mesh( geometry, material[4] );
    mesh3.position.set(100, 200, -100);


    scene.add(light);
    scene.add(light.target);
    scene.add(spotLight);
    scene.add(spotLight.target);
    scene.add(spotLight2);
    scene.add(spotLight2.target);
    scene.add(spotLight3);
    scene.add(spotLight3.target);


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
    camera.position.set( 500, 500, 500 );
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