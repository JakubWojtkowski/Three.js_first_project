import * as THREE from './node_modules/three/build/three.module.js';

import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
// scene, camera, render
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera ); // render = scene + camera


// mesh
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347} );
const torus = new THREE.Mesh( geometry, material ); // MESH = geometry + material

scene.add( torus );

// lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set( 20, 20, 20 );

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add( pointLight, ambientLight );

/*
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add( lightHelper, gridHelper );
*/

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {  // game loop, to not update our render over and over again when we add a new obj to the scene
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render( scene, camera );
}

animate();