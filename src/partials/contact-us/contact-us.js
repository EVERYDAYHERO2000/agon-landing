import {
    BoxBufferGeometry,
    Mesh,
    MeshBasicMaterial,
    MeshPhongMaterial,
    MeshPhysicalMaterial,
    PlaneBufferGeometry,
    Scene,
    ShaderMaterial,
    TextureLoader,
    Vector2,
    PerspectiveCamera,
    SphereGeometry,
    DirectionalLight,
    AmbientLight,
    WebGLRenderer
  } from "../three/three.module.js";
import SimplexNoise from 'simplex-noise';  

export const renderContactUs = () => {

    new TextureLoader().load('assets/map_2.jpg', (t)=> {
        init(t);
    });

    function init(texture) {
    
        let speed = 13,
            spikesconst = 0.6,
            processing = 1;
    
        let $canvas = document.getElementById('blob'),
            $parent = $canvas.parentElement,
            renderer = new WebGLRenderer({
                canvas: $canvas,
                context: $canvas.getContext('webgl2'),
                antialias: true,
                alpha: true
            }),
            simplex = new SimplexNoise();

            
        console.log($parent.width, $parent.height);    

        renderer.setSize($parent.offsetWidth, $parent.offsetHeight);
        renderer.setPixelRatio(window.devicePixelRatio || 1);

    
        let scene = new Scene(),
            camera = new PerspectiveCamera(45, $canvas.width / $canvas.height, 0.1, 1000);
    
        camera.position.z = 7;
    
        let geometry = new SphereGeometry(.8, 128, 128);   

        let material = new MeshBasicMaterial( { map: texture } );
        /*let material = new MeshPhysicalMaterial({
			roughness: 0.8,
			metalness: 0,
            color: 0x0728EF,
            envMap: texture,
            envMapIntensity: 1,
        });*/
    
        let lightTop = new DirectionalLight(0xFFFFFF, .7);
        lightTop.position.set(0, 500, 200);
        lightTop.castShadow = true;
        scene.add(lightTop);
    
        let lightBottom = new DirectionalLight(0xFFFFFF, .25);
        lightBottom.position.set(0, -500, 400);
        lightBottom.castShadow = true;
        scene.add(lightBottom);
    
        let ambientLight = new AmbientLight(0x798296);
        scene.add(ambientLight);
    
        let sphere = new Mesh(geometry, material);
    
        scene.add(sphere);
    
        let update = () => {
    
            let time = performance.now() * 0.00001 * speed * Math.pow(processing, 3),
                spikes = spikesconst * processing;
    
            for(let i = 0; i < sphere.geometry.vertices.length; i++) {
                let p = sphere.geometry.vertices[i];
                p.normalize().multiplyScalar(1 + 0.3 * simplex.noise3D(p.x * spikes, p.y * spikes, p.z * spikes + time));
            }
    
            sphere.geometry.computeVertexNormals();
            sphere.geometry.normalsNeedUpdate = true;
            sphere.geometry.verticesNeedUpdate = true;
    
        }

        /**
         * 
         */
         var mouseDown = true,
         mouseX = 0,
         mouseY = 0;
 
     function onMouseMove(evt) {
         if (!mouseDown) {
             return;
         }
 
         evt.preventDefault();
 
         var deltaX = (evt.clientX - mouseX) / 30,
             deltaY = (evt.clientY - mouseY) / 30;
         mouseX = evt.clientX;
         mouseY = evt.clientY;
         rotateScene(deltaX, deltaY);
     }
 
     function onMouseDown(evt) {
         evt.preventDefault();
 
         mouseDown = true;
         mouseX = evt.clientX;
         mouseY = evt.clientY;
     }
 
     function onMouseUp(evt) {
         evt.preventDefault();
 
         mouseDown = false;
     }
 
     function addMouseHandler(canvas) {
     $canvas.addEventListener('mousemove', function (e) {
         onMouseMove(e);
     }, false);
     $canvas.addEventListener('mousedown', function (e) {
         onMouseDown(e);
     }, false);
     $canvas.addEventListener('mouseup', function (e) {
         onMouseUp(e);
     }, false);
 }
 
     function rotateScene(deltaX, deltaY) {
     scene.rotation.y += deltaX / 100;
     scene.rotation.x += deltaY / 100;
 }

 addMouseHandler($canvas);
        /**
         * 
         */
    
        function animate() {
            update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
    
        requestAnimationFrame(animate);

    }    
    
}
