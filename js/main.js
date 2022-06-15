/*global THREE, requestAnimationFrame, console, dat*/
var cameras = [];

//Clock creation
var clock = new THREE.Clock();

var controls;

var lightsON = true;

var stereoCamera, scene, renderer, currentCamera;

var origami1, origami2, origami3;

var ambLight, light, spotLight, spotLight2, spotLight3;

var ambInt, dirInt, spotInt;

var spotLight3D, spotLight3D1, spotLight3D2;

/*Colors that will be used in the materials
Respectively, blue, cyan, magenta, yellow, green*/
var colors = [0x0000FF,0x00FFFF,0xFF00FF,0xFFFF00, 0x00FF00, 0x0AB920, 0xF79573];

var material = [];

//auxiliary object that holds the pressed 
//status of every key used in the program
let keys = {
    Q : false,
    W : false,
    E : false,
    R : false,
    T : false,
    Y : false
}

/*Function responsible for creating all the objects and scene*/
function createScene() {
    'use strict';

    scene = new THREE.Scene ( ) ;

    /* const texture = new THREE.TextureLoader().load( "js/assets/textures/origami_paper.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 4, 4 ); */

    material[0] = new THREE.MeshPhongMaterial({ color: colors[1], side: THREE.DoubleSide });//Plane
    material[1] = new THREE.MeshPhongMaterial({ color: colors[2], side: THREE.DoubleSide });//Palanque
    material[2] = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide, emissive: 0xffffff }); // SpotLights 
    material[3] = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide, emissive: 0xffffff });// (materials need to be separate so the emissive can be toggled)
    material[4] = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide, emissive: 0xffffff });

    addLight();

    //----------------------------------Plane & Palanque-------------

    plane = new Plane(0, -3, 0, 1000, 1000, material[0]);
    palanque = new Palanque(0, 0, 0, 200, 400, 400, material[1]);

    //---------------------------------Origamis------------------------
    
    let vertices = new Float32Array( [
        0, 0, 0,
        0, 100, 0,
        50,  50,  20,

        0, 0, 0,
        0, 100, 0,
        -50, 50, 20
    ] );

    origami1 = new Origami(-130, 200, -100, vertices, 0xffffff);
    origami1.getMesh().rotateX(-0.1);
    
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

    origami2 = new Origami(0, 200, -100, vertices1, 0xffffff);
    origami2.getMesh().rotateX(-0.1);
    
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

    origami3 = new Origami(100, 200, -100, vertices2, 0xffffff);

    //----------------------------------SpotLight's-------------------------

    spotLight3D = new Spotlight(-130,400,-100,50,25,material[1], material[2]); 
    spotLight3D1 = new Spotlight(0,400,-100,50,25,material[1], material[3]); 
    spotLight3D2 = new Spotlight(130,400,-100,50,25,material[1], material[4]); 

    scene.add ( spotLight3D.getGroup() );
    scene.add ( spotLight3D1.getGroup() );
    scene.add ( spotLight3D2.getGroup() );

    scene.add(origami1.getMesh());
    scene.add(origami2.getMesh());
    scene.add(origami3.getMesh());

    scene.add(plane.getMesh());
    scene.add(palanque.getGroup());

}


function addLight() {

    const color = 0xFFFFFF;
    ambInt = 0;
    dirInt = 0.6;
    spotInt = 0.3;

    ambLight = new THREE.AmbientLight(color, ambInt);

    light = new THREE.DirectionalLight(color, dirInt);
    light.position.set(50, 350, 200);
    light.target.position.set(0,200, 0);

    /* const helper = new THREE.DirectionalLightHelper( light, 50 );
    scene.add( helper ); */

    spotLight = new THREE.SpotLight( color, spotInt, 0, Math.PI / 6, 1);
    spotLight.position.set( -130, 400, -100 );
    spotLight.target.position.set(-130, 0, -100);

    /* const helper1 = new THREE.SpotLightHelper( spotLight, 50);
    scene.add( helper1 ); */

    
    spotLight2 = new THREE.SpotLight( color, spotInt, 0, Math.PI / 6, 1);
    spotLight2.position.set( 0, 400, -100 );
    spotLight2.target.position.set(0, 0, -100);
    
    spotLight3 = new THREE.SpotLight( color, spotInt, 0, Math.PI / 6, 1);
    spotLight3.position.set( 100, 400, -100 );
    spotLight3.target.position.set(100, 0, -100);


    /* const gui = new dat.GUI();
    gui.add(light, 'intensity', 0, 2, 0.01);
    gui.add(light.target.position, 'x', -1000, 1000);
    gui.add(light.target.position, 'z', -1000, 1000);
    gui.add(light.target.position, 'y', 0, 1000); */

    scene.add(ambLight);
    
    scene.add(light);
    scene.add(light.target);

    scene.add(spotLight);
    scene.add(spotLight.target);

    scene.add(spotLight2);
    scene.add(spotLight2.target);

    scene.add(spotLight3);
    scene.add(spotLight3.target);
}

function switchLights() {
    if (lightsON) {
        ambLight.intensity = 0;
        light.intensity = 0;
        spotLight.intensity = 0;
        spotLight2.intensity = 0;
        spotLight3.intensity = 0;
        lightsON = false;
    } else {
        ambLight.intensity = ambInt;
        light.intensity = dirInt;
        spotLight.intensity = spotInt;
        spotLight2.intensity = spotInt;
        spotLight3.intensity = spotInt;
        lightsON = true;
    }
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
    camera.position.set( 0, 200, 2000 );
    camera.lookAt( scene.position );
    cameras.push( camera );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set( 0, 500, 900 );
    camera.lookAt( scene.position );
    cameras.push( camera );

    stereoCamera = new THREE.StereoCamera();
    cameras.push( stereoCamera );

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
    case 65: //A
        origami1.alternateMaterial();
        origami2.alternateMaterial();
        origami3.alternateMaterial();
        break;
    case 83: //S
        switchLights();
        break;
    case 90: //Z
        if (lightsON && spotLight.intensity != 0){
            spotLight.intensity = 0;
            spotLight3D.toggleEmissive(false);
        } else if (lightsON && spotLight.intensity == 0){
            spotLight.intensity = spotInt;
            spotLight3D.toggleEmissive(true);
        }
        break;
    case 88: //X
        if (lightsON && spotLight2.intensity != 0){
            spotLight2.intensity = 0;
            spotLight3D1.toggleEmissive(false);
        } else if (lightsON && spotLight2.intensity == 0){
            spotLight2.intensity = spotInt;
            spotLight3D1.toggleEmissive(true);
        }
        break;
    case 67: //C
        if (lightsON && spotLight3.intensity != 0){
            spotLight3.intensity = 0;
            spotLight3D2.toggleEmissive(false);
        } else if (lightsON && spotLight3.intensity == 0){
            spotLight3.intensity = spotInt;
            spotLight3D2.toggleEmissive(true);
        }
        break;
    
    case 68: //D
        if (lightsON && light.intensity != 0){
            light.intensity = 0;
        } else if (lightsON && light.intensity == 0){
            light.intensity = dirInt;
        }
        break;
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
    }
}

/*Function responsible for managing the movements*/
function checkForMovements() {
    'use strict';

    //Get current time
    var delta = clock.getDelta();

    if (keys.Q)
        origami1.getMesh().rotateY(THREE.MathUtils.degToRad(-delta*40));
    else if (keys.W)
        origami1.getMesh().rotateY(THREE.MathUtils.degToRad(delta*40));
    else if (keys.E)
        origami2.getMesh().rotateY(THREE.MathUtils.degToRad(-delta*40));
    else if (keys.R)
        origami2.getMesh().rotateY(THREE.MathUtils.degToRad(delta*40));
    else if (keys.T)
        origami3.getMesh().rotateY(THREE.MathUtils.degToRad(-delta*40));
    else if (keys.Y)
        origami3.getMesh().rotateY(THREE.MathUtils.degToRad(delta*40));

    
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
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);
    document.body.appendChild( VRButton.createButton( renderer ) ); 

    createScene();
    createCamera();
    controls = new THREE.OrbitControls(currentCamera, renderer.domElement);
    controls.update();

    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
    window.addEventListener('wheel', function(event) {
        event.preventDefault();},
        {passive: false, capture: true});
}

/*Function responsible for animation effects*/
function animate() {
    renderer.setAnimationLoop( animate ); 
    render();     
    checkForMovements();
    controls.update();
}