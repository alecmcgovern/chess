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
  const geometryZ = new THREE.CylinderGeometry(0.01, 0.01, 100);
  const materialZ = new THREE.MeshNormalMaterial();
  const meshZ = new THREE.Mesh(geometryZ, materialZ);
  // geometryZ.translate( 0, 0, 0 );
  scene.add(meshZ);

}