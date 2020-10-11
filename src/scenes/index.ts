import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { addDevtools } from './devtools';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let mesh: THREE.Mesh;
let orbitControls: any;

export const initScene = (container: HTMLDivElement) => {
  const { clientHeight, clientWidth } = container;
  const aspectRatio = clientWidth / clientHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 100);
  camera.position.z = 10;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(clientWidth, clientHeight);
  container.appendChild(renderer.domElement);
  
  orbitControls = new OrbitControls(camera, renderer.domElement);

  addDevtools(scene);
  addChessboard(scene);

  animate();
}

export const animate = () => {
  requestAnimationFrame(animate);
  renderer.render( scene, camera );
}

const addChessboard = (scene: THREE.Scene) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const geometry = new THREE.BoxGeometry(1, 0.2, 1);
      const material = new THREE.MeshNormalMaterial();
      
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = i*1.1 + 1;
      mesh.position.z = j*1.1 + 1;
      scene.add(mesh);
    }
  }
}