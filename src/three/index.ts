import {
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { Easing, Tween, update } from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { addDevtools } from './devtools';
import { addLighting } from './lighting/lighting';
import { initObjects } from './objects';

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let orbitControls: any;
let pointLight: PointLight;

export const initScene = (container: HTMLDivElement) => {
  const { clientHeight, clientWidth } = container;
  const aspectRatio = clientWidth / clientHeight;
  scene = new Scene();
  camera = new PerspectiveCamera(70, aspectRatio, 0.1, 100);
  camera.position.set(0, 50, 0);

  renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(clientWidth, clientHeight);
  container.appendChild(renderer.domElement);
  
  orbitControls = new OrbitControls(camera, renderer.domElement);

  addDevtools(scene);
  initObjects(scene);
  addLighting(scene);

  pointLight = new PointLight(0xFFFFFF, 2);
  pointLight.position.set(20,20,20);
  pointLight.castShadow = true;

  // scene.add(pointLight);
  const from = {
    x : camera.position.x,
    y : camera.position.y,
    z : camera.position.z
  };
  
  const to = {
    x : 0,
    y : 8,
    z : 15
  };

  const lookAt = new Vector3(0,0,0);
  moveCamera(camera, from, to, lookAt);

  animate();
}

export const moveCamera = (camera: PerspectiveCamera, from: Record<string, any>, to: Record<string, any>, lookAt: Vector3) => {
  const tween = new Tween(from)
    .to(to, 1600)
    .easing(Easing.Quadratic.InOut)
    .onUpdate(({x, y, z}) => {
      camera.position.set(x, y, z);
      camera.lookAt(lookAt);
    })
    .onComplete(function () {
      camera.lookAt(lookAt);
      // circleBoard(camera, lookAt);
    })
    .start();
}

export const circleBoard = (camera: PerspectiveCamera, lookAt: Vector3) => {
  const { x, y, z } = camera.position;
  const tween = new Tween({ x, y, z, loop: true })
    .to({ x, y, z, rotation: 360 }, 1600)
    .easing(Easing.Quadratic.InOut)
    .onUpdate((params) => {
      console.log(params);
      const {x, y, z} = params;
      camera.position.set(x, y, z);
      camera.lookAt(lookAt);
    })
    .onComplete(function () {
      camera.lookAt(lookAt);
    })
    .start();
}

export const animate = () => {
  update();
  requestAnimationFrame(animate);
  renderer.render( scene, camera );
  const { position: { x, y, z } } = camera;
  pointLight.position.set(x, y, z);
}