import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';

export function three_render(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const controls = new OrbitControls(camera, document.body); 

    const renderer = new THREE.WebGLRenderer();
    //renderer.setSize(window.innerWidth, window.innerHeight);
    
    onResize();
    window.addEventListener('resize', onResize);

    document.body.appendChild(renderer.domElement);
    renderer.setAnimationLoop( animate );
    document.body.appendChild( renderer.domElement );

    const loader = new GLTFLoader();
    let mixer = null;
    let animations = [];
    let currentAction = null;

    loader.load('monkey.glb', function ( gltf ) {
        scene.add( gltf.scene );
        animations = gltf.animations;
        
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

    //const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //const cube = new THREE.Mesh( geometry, material );
    //scene.add( cube );

    const ambientLight = new THREE.DirectionalLight(0xffffff, 0.6); // 太陽光
    scene.add(ambientLight);
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x4169e1, 0.4);
    scene.add(hemisphereLight);

    // 背景の設定
    scene.background = new THREE.Color(0xccffff);

    new RGBELoader().load('golden_gate_hills_2k.hdr', function(texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
    });

    camera.position.z = 5;

    function animate() {

        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;
        if (mixer) {
            mixer.update(0.01); // アニメーションを更新（時間を進める）
        }
        renderer.render( scene, camera );

    }

    function onResize(){
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    const dropZone = document.body; // ドラッグアンドドロップ対象

    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];

        // GLTFファイル以外は無視
        //if (file.type !== 'application/json' && file.type !== 'model/gltf+json') {
        //    console.log("GLTFファイルではありません");
        //    return;
        //}

        const reader = new FileReader();
        reader.onload = function (e) {
            const arrayBuffer = e.target.result;
            const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);

            // 新しいGLTFモデルを読み込んでシーンに追加
            loader.load(url, function (gltf) {
                // もし現在シーンにモデルがあれば削除
                if (currentModel) {
                    scene.remove(currentModel);
                }

                // 新しいモデルをシーンに追加
                scene.add(gltf.scene);
                currentModel = gltf.scene;
            }, undefined, function (error) {
                console.error(error);
            });
        };

        reader.readAsArrayBuffer(file);
    });
    
}