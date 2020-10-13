import { ObjectLoader } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

type ILoader = ObjectLoader | GLTFLoader;

export const promisifyGLTFLoader = (loader: ILoader, onProgress: (xhr: any) => void) => {
	const promiseLoader = (url: string) => {
		return new Promise((resolve, reject) => {
			loader.load(url, resolve, onProgress, reject);
		});
	}

	return {
		originalLoader: loader,
		load: promiseLoader,
	};
}


export const loadGLB = async (objectPath: string, onProgress: (xhr: any) => void): Promise<GLTF | undefined> => {
  const GLBLoader = promisifyGLTFLoader(new GLTFLoader(), onProgress);

  try {
    // @ts-ignore
    const object: GLTF = GLBLoader.load(objectPath);
    return object;
  } catch (error) {
    console.log(error);
  }
}