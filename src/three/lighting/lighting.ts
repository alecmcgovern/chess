import * as THREE from 'three';
import { PointLight, Scene } from 'three';

export const addLighting = (scene: Scene) => {

  // addDirectionalLight(scene);
  addPointLight(scene);
}

const addDirectionalLight = (scene: Scene) => {
  const directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 1 );
  directionalLight.position.set( 100, 150, 150 );
  directionalLight.castShadow = true;
  scene.add( directionalLight );
}

export const addPointLight = (scene: Scene) => {
  const pointLight = new PointLight(0xFFFFFF, 2);
  pointLight.position.set(20,20,0);
  pointLight.castShadow = true;

  scene.add(pointLight);
}