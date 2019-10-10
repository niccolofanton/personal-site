import { Component, OnInit } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { reject } from 'q';

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
    this.renderer.setSize((width / 100) * 30, (width / 100) * 30);
    this.renderer.domElement.id = 'face-renderer';
    document.getElementById('face-container').appendChild(this.renderer.domElement);

    // create camera
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerWidth, 0.5, 100);
    this.camera.position.z = 1.2;
    this.camera.position.y = 0;

    // create light
    const light = new THREE.HemisphereLight(0xffffff, 1, 1.4);
    light.position.set(0, 0, 1);

    // create scene
    this.scene = new THREE.Scene();
    this.scene.add(light);
    this.scene.add(gltf.scene);

    const animation = () => {
      gltf.scene.rotation.x += 0.02;
      gltf.scene.rotation.y -= 0.02;
      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(animation);
    };

    animation();




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


  private loadFace(): Promise<any> {
    return new Promise((resolve, err) => {
      const loader = new GLTFLoader();
      loader.load(
        './assets/face-models/face.gltf.glb',
        gltf => resolve(gltf),
        (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
        error => err(error)
      );
    });
  }
}
