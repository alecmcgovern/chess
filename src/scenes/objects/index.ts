import {
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  ObjectLoader,
  Scene,
} from 'three';

export const addObjects = (scene: Scene) => {
  addChessboard(scene);
  addChessPieces(scene);
}

export const addChessboard = (scene: Scene) => {
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

export const addChessPieces = (scene: Scene) => {
  const loader = new ObjectLoader();

  // loader.load(
  //   './public/objects/chess.obj',
  //   () => {
  //     console.log("finished loading");
  //   },
  //   (xhr) => {
  //     const progress = xhr.loaded / xhr.total * 100
  //     console.log(`${progress}% loaded`);
  //   },
  //   (error) => {
  //     console.error('There was an issue loading your object', error);
  //   }
  // );
}