
var scene = new THREE.Scene();
scene.name = 'Scene';

let container = document.getElementById('container'), 
    renderer, 
    camera, 
    pokeball, 
    stats;

function init() {

    let vw = window.innerWidth, 
        vh = window.innerHeight;

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setSize(vw, vh);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    camera = new THREE.PerspectiveCamera(45, vw / vh, 1, 1000);
    camera.position.z = 80;
    camera.position.x = -30;
    camera.position.y = 20;
    camera.lookAt(scene.position);
    camera.name = 'Camera';
    scene.add(camera);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);

    container.appendChild(renderer.domElement);


}

function onResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);    

}

function setupStats() {

    stats = new Stats();
    container.appendChild(stats.domElement);

}

function drawPokeball() {

    let pokeball_size = 20, 
        pokeball_segments = 48;

    pokeball = new THREE.Group();
    pokeball.name = 'Pokeball';

    /**
     * Upper side
     */
    let ballUpGeom        = new THREE.SphereGeometry(pokeball_size, pokeball_segments, pokeball_segments, 0, Math.PI * 2, 0, (Math.PI / 2) * 0.97), 
        ballUpClosingGeom = new THREE.CircleGeometry(pokeball_size, pokeball_segments), 
        ballUpMat         = new THREE.MeshLambertMaterial({color: 0xff0000});
    
    ballUpMat.side = THREE.DoubleSide;

    let ballUp = new THREE.Mesh(ballUpGeom, ballUpMat);
    ballUp.name = 'Pokeball upper side';

    // Closing
    let ballUpClosing = new THREE.Mesh(ballUpClosingGeom, ballUpMat);
    ballUpClosing.rotateX( THREE.Math.degToRad(90) );
    ballUpClosing.position.set(0, pokeball_size - pokeball_size * 0.95, 0);
    ballUpClosing.name = 'Pokeball upper closing';


    /**
     * Lower side
     */
    let ballDownGeom        = new THREE.SphereGeometry(pokeball_size, pokeball_segments, pokeball_segments, 0, Math.PI * 2, (Math.PI / 2) * 1.03, Math.PI / 2), 
        ballDownClosingGeom = new THREE.CircleGeometry(pokeball_size, pokeball_segments), 
        ballDownMat         = new THREE.MeshLambertMaterial({color: 0xffffff});
    
    ballDownMat.side = THREE.DoubleSide;

    let ballDown = new THREE.Mesh(ballDownGeom, ballDownMat);
    ballDown.name = 'Pokeball Lower side';

    // Closing
    let ballDownClosing = new THREE.Mesh(ballDownClosingGeom, ballDownMat);
    ballDownClosing.rotateX( THREE.Math.degToRad(90) );
    ballDownClosing.position.set(0, -(pokeball_size - pokeball_size * 0.95), 0);
    ballDownClosing.name = 'Pokeball lower closing';


    /**
     * Inner side
     */
    let ballInnerGeom = new THREE.SphereGeometry(pokeball_size * 0.95, pokeball_segments, pokeball_segments), 
        ballInnerMat = new THREE.MeshLambertMaterial({color: 0x000000});

    let ballInner = new THREE.Mesh(ballInnerGeom, ballInnerMat);
    ballInner.name = 'Pokeball inner side';


    /**
     * Opening
     */
    let opening = new THREE.Group();
    opening.name = 'Opening';

    // Outer
    let openingOuterGeom = new THREE.CylinderGeometry(5, 5, 3, pokeball_segments), 
        openingOuterMat  = new THREE.MeshLambertMaterial({color: 0x000000});

    let openingOuter  = new THREE.Mesh(openingOuterGeom, openingOuterMat);
    openingOuter.name = 'Outer';

    // Middle
    let openingMiddleGeom = new THREE.CylinderGeometry(3, 3, 3, pokeball_segments), 
        openingMiddleMat  = new THREE.MeshLambertMaterial({color: 0xffffff});

    let openingMiddle  = new THREE.Mesh(openingMiddleGeom, openingMiddleMat);
    openingMiddle.name = 'Middle';
    openingMiddle.position.y = 0.7;

    // Inner
    let openingInnerGeom = new THREE.CylinderGeometry(2, 2, 3, pokeball_segments), 
        openingInnerMat  = new THREE.MeshLambertMaterial({color: 0xffffff});

    let openingInner  = new THREE.Mesh(openingInnerGeom, openingInnerMat);
    openingInner.name = 'Inner';
    openingInner.position.y = 1;


    opening.rotateX( THREE.Math.degToRad(90) );
    opening.position.set(0, 0, pokeball_size * 0.93);

    opening.add(openingOuter);
    opening.add(openingMiddle);
    opening.add(openingInner);


    // Putting all together
    pokeball.add(ballUp);
    pokeball.add(ballUpClosing);
    pokeball.add(ballDown);
    pokeball.add(ballDownClosing);
    pokeball.add(ballInner);
    pokeball.add(opening);

    scene.add(pokeball);

}

function setupLight() {

    let ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    ambientLight.name = 'Ambient Light';
    scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.name = 'Directional Light';
    directionalLight.position.set(30, 20, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.darkness = 1;
    directionalLight.shadow.camera.right     =  5;
    directionalLight.shadow.camera.left     = -5;
    directionalLight.shadow.camera.top      =  5;
    directionalLight.shadow.camera.bottom   = -5;
    scene.add(directionalLight);

    // let helper = new THREE.CameraHelper( directionalLight.shadow.camera );
    // helper.name = 'DirectionalLight CameraHelper';
    // scene.add( helper );


}

function render() {

    renderer.render(scene, camera);
    requestAnimationFrame(render);

}

init();
setupLight();
drawPokeball();
render();