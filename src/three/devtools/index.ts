import * as THREE from 'three';

export const addDevtools = (scene: THREE.Scene) => {
  // centerDot(scene);
  axes(scene);
}

export const centerDot = (scene: THREE.Scene) => {
  const geometry = new THREE.SphereGeometry(0.1, 0.1, 0.1);
  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

export const axes = (scene: THREE.Scene) => {
  const axesHelper = new THREE.AxesHelper(20);
  scene.add(axesHelper);

}