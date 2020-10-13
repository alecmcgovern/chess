import {
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  Scene,
} from 'three';
import { loadGLB } from '../services/loader-service'; 

import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

// @ts-ignore
import cylinder from '../../assets/cylinder.glb';

export const addObjects = (scene: Scene) => {
  createChessboard(scene);
  addChessPieces(scene);
}

export const createChessboard = (scene: Scene) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const color = ( i + j ) % 2 ? 'black' : 'white';
      const geometry = new BoxGeometry(1, 0.2, 1);
      const material = new MeshLambertMaterial({ color });
      
      const mesh = new Mesh(geometry, material);
      mesh.position.x = i*1.1 - 4;
      mesh.position.z = j*1.1 - 4;
      scene.add(mesh);
    }
  }
}

export const addChessPieces = async (scene: Scene) => {
  const piece: GLTF | null | undefined = await loadGLB(cylinder, (xhr: any) => {
    console.log(xhr);
    const progress = xhr.loaded / xhr.total * 100
    console.log(`${progress}% loaded`);
  });

  if (piece && piece.scene) {
    const material = new MeshLambertMaterial({ color: 'yellow' });
    scene.add(piece.scene.children[2]);
    // const mesh = new Mesh(piece.scene, material);
  }
}