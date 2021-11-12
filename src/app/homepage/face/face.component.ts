import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';



@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.scss']
})
export class FaceComponent implements OnInit {

  private camera: any;
  private scene: any;
  private renderer: any;

  constructor() { }

  async ngOnInit() {

    // load model
    const gltf = await this.loadFace().catch(err => { console.error(err); return; });

    // create renderer
    const width = window.innerWidth > 800 ? window.innerWidth : window.innerWidth * 2;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize((width / 100) * 30, (width / 100) * 30);
    this.renderer.domElement.id = 'face-renderer';
    document.getElementById('face-container').appendChild(this.renderer.domElement);

    // create camera
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerWidth, 0.5, 100);
    this.camera.position.z = 10;
    this.camera.position.y = 0;

    // create light
    const light = new THREE.HemisphereLight(0xffffff, 1, 1.4);
    light.position.set(0, 0, 1);

    // create scene
    this.scene = new THREE.Scene();
    this.scene.add(light);
    this.scene.add(gltf.scene);


    const composer = new EffectComposer(this.renderer);

    const renderPass = new RenderPass(this.scene, this.camera);
    composer.addPass(renderPass);

    const glitchPass = new GlitchPass();
    composer.addPass(glitchPass);

    // const bloomPass = new BloomPass();
    // composer.addPass(bloomPass);

    


    // let composer = new EffectComposer(this.renderer);
    // composer.addPass(new RenderPass(this.scene, this.camera));

    // const effectPass = new EffectPass(
    //   this.camera,
    //   new BloomEffect()
    // );
    // effectPass.renderToScreen = true;
    // composer.addPass(effectPass);

    console.log(gltf);
    

    let counter = 0;

    const animation = () => {

      counter += 0.08;

      // gltf.scene.rotation.x += 0.02;
      // gltf.scene.rotation.y -= 0.02;
      gltf.scene.position.y = Math.sin(counter) / 10;

      

      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(animation);
      composer.render();
    };

    animation();


    document.addEventListener('mousemove', (e) => {
      var mouse = this.getMousePos(e);
      let degrees = this.getMouseDegrees(mouse.x, mouse.y, 30);

      gltf.scene.rotation.x = degrees.y/70;
      gltf.scene.rotation.y = degrees.x/70;
    });

    // this.renderer.render(this.scene, this.camera);
    // document.addEventListener('mousemove', (e) => {
    //   var mouse = new THREE.Vector3(((e.clientX / window.innerWidth) * 2 - 1), -(-(e.clientY / window.innerHeight) * 2 + 1), 0);
    //   this.mesh.scene.rotation.y = mouse.x;
    //   this.mesh.scene.rotation.x = mouse.y;
    //   this.renderer.render(this.scene, this.camera);
    // });

    // let vanish = anime({
    //   targets: '.canvas-text',
    //   //delay: (el, i) => { return i * 10; },
    //   //elasticity: 100,
    //   opacity: 0,
    //   scale: 0.2,
    //   easing: 'easeInOutSine',
    //   autoplay: false
    // });

  }


   getMousePos(e) {
    return { x: e.clientX, y: e.clientY };
  }

  private getMouseDegrees(x, y, degreeLimit) {
    let dx = 0,
        dy = 0,
        xdiff,
        xPercentage,
        ydiff,
        yPercentage;
  
    let w = { x: window.innerWidth, y: window.innerHeight };
  
    // Left (Rotates neck left between 0 and -degreeLimit)
    
     // 1. If cursor is in the left half of screen
    if (x <= w.x / 2) {
      // 2. Get the difference between middle of screen and cursor position
      xdiff = w.x / 2 - x;  
      // 3. Find the percentage of that difference (percentage toward edge of screen)
      xPercentage = (xdiff / (w.x / 2)) * 100;
      // 4. Convert that to a percentage of the maximum rotation we allow for the neck
      dx = ((degreeLimit * xPercentage) / 100) * -1; }
  // Right (Rotates neck right between 0 and degreeLimit)
    if (x >= w.x / 2) {
      xdiff = x - w.x / 2;
      xPercentage = (xdiff / (w.x / 2)) * 100;
      dx = (degreeLimit * xPercentage) / 100;
    }
    // Up (Rotates neck up between 0 and -degreeLimit)
    if (y <= w.y / 2) {
      ydiff = w.y / 2 - y;
      yPercentage = (ydiff / (w.y / 2)) * 100;
      // Note that I cut degreeLimit in half when she looks up
      dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
      }
    
    // Down (Rotates neck down between 0 and degreeLimit)
    if (y >= w.y / 2) {
      ydiff = y - w.y / 2;
      yPercentage = (ydiff / (w.y / 2)) * 100;
      dy = (degreeLimit * yPercentage) / 100;
    }
    return { x: dx, y: dy };
  }


  private loadFace(): Promise<any> {
    return new Promise((resolve, err) => {
      const loader = new GLTFLoader();
      loader.load(
        // './assets/face-models/face.gltf.glb',
        './assets/face-models/untitled.glb',
        gltf => resolve(gltf),
        (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
        error => err(error)
      );
    });
  }
}
