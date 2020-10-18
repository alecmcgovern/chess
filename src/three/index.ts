import {
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { addDevtools } from './devtools';
import { addLighting } from './lighting';
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
  camera.position.set(0, 5, 10);

  renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(clientWidth, clientHeight);
  container.appendChild(renderer.domElement);
  
  orbitControls = new OrbitControls(camera, renderer.domElement);

  addDevtools(scene);
  initObjects(scene);
  // addLighting(scene);

  pointLight = new PointLight(0xFFFFFF, 2);
  pointLight.position.set(20,20,20);
  pointLight.castShadow = true;

  scene.add(pointLight);

  animate();
}

export const animate = () => {
  requestAnimationFrame(animate);
  renderer.render( scene, camera );
  const { position: { x, y, z } } = camera;
  pointLight.position.set(x, y, z);
}