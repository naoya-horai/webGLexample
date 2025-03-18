import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function three_render(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const controls = new OrbitControls(camera, document.body); 

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setAnimationLoop( animate );
    document.body.appendChild( renderer.domElement );

    const loader = new GLTFLoader();

    loader.load('monkey.glb', function ( gltf ) {
        scene.add( gltf.scene );
    }, undefined, function( error ) {
        console.error( error );
    } );

    //const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //const cube = new THREE.Mesh( geometry, material );
    //scene.add( cube );

    const light = new THREE.DirectionalLight(0xFFFFFF, 2)
    scene.add( light );

    camera.position.z = 5;

    function animate() {

        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;

        renderer.render( scene, camera );

    }
}