import {
  BoxGeometry,
  BufferGeometry,
  Geometry,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Scene,
} from 'three';
import { loadGLB } from '../services/loader-service'; 

import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

// @ts-ignore
import cylinder from '../../assets/cylinder.glb';

let scene: Scene;

export const initObjects = (initialScene: Scene) => {
  scene = initialScene;
  addInitialObjects();
}

export const addInitialObjects = () => {
  createChessboard();
  setupPieces();
}

export const createChessboard = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const color = ( i + j ) % 2 ? 'black' : 'white';
      const geometry = new BoxGeometry(0.9, 0.2, 0.9);
      const material = new MeshLambertMaterial({ color });
      
      const mesh = new Mesh(geometry, material);
      mesh.position.x = i - 4;
      mesh.position.z = j - 4;
      scene.add(mesh);
    }
  }
}

export const setupPieces = async () => {
  const pawnGeometry = await getPawnGeometry();

  const blackMat= new MeshPhongMaterial({ color: 'black' });
  const whiteMat= new MeshPhongMaterial({ color: 'white' });


  const mesh = new Mesh(pawnGeometry, whiteMat);
  // scene.add(mesh);
}

export const getPawnGeometry = async (): Promise<BufferGeometry | Geometry | undefined> => {
  try {
    const piece: GLTF | null | undefined = await loadGLB(cylinder, () => {});
    const geometry = (piece!.scene.children[2] as Mesh).geometry;

    return geometry!;
  } catch(error) {
    console.error(error);
    return;
  }
}