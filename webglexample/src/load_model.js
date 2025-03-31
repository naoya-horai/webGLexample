import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function load_model(scene, loader,mixer){
    loader.load('monkey.glb', function ( gltf ) {
        scene.add( gltf.scene );
        const animations = gltf.animations;
        
        if (gltf.animations && gltf.animations.length) {
            
            mixer = new THREE.AnimationMixer(gltf.scene);
            mixer.stopAllAction();
            const anime = mixer.clipAction(animations[0]);
            //anime.setLoop(THREE.LoopOnce)
            anime.clampWhenFinished = true
        
            anime.play();
        }
        
    }, undefined, function( error ) {
        console.error( error );
    } );
}