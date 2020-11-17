import {
  BoxGeometry,
  BufferGeometry,
  Geometry,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
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
      const material = new MeshPhongMaterial({ color });
      
      const mesh = new Mesh(geometry, material);
      mesh.position.x = i;
      mesh.position.z = j;
      scene.add(mesh);
    }
  }
}

export const setupPieces = async () => {
  const pawnGeometry = await getPawnGeometry();

  const blackPhongMaterial= new MeshPhongMaterial({ color: 'black' });
  const whitePhongMaterial= new MeshPhongMaterial({ color: 'white' });
  
  // white pawns
  for (let i = 0; i < 8; i++) {
    const whitePawn = new Mesh(pawnGeometry, whitePhongMaterial);
    whitePawn.position.set(1, 0.5, i);
    whitePawn.castShadow = true;
    scene.add(whitePawn);
  }

  // black pawns
  for (let i = 0; i < 8; i++) {
    const blackPawn = new Mesh(pawnGeometry, blackPhongMaterial);
    blackPawn.position.set(6, 0.5, i);
    blackPawn.castShadow = true;
    scene.add(blackPawn);
  }
}

export const getPawnGeometry = async (): Promise<BufferGeometry | Geometry | undefined> => {
  try {
    const piece: GLTF | null | undefined = await loadGLB(cylinder, () => {});
    const geometry = (piece!.scene.children[2] as Mesh).geometry;
    geometry.scale(0.2, 0.4, 0.2);
    return geometry!;
  } catch(error) {
    console.error(error);
    return;
  }
}