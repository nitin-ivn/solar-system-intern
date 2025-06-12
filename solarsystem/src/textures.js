import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('/textures/cubeMap/');

const textures = {
    sunTexture : textureLoader.load("/textures/2k_sun.jpg"),
    mercuryTexture : textureLoader.load("/textures/2k_mercury.jpg"),
    venusTexture : textureLoader.load("/textures/2k_venus_surface.jpg"),
    earthTexture : textureLoader.load("/textures/2k_earth_daymap.jpg"),
    marsTexture : textureLoader.load("/textures/2k_mars.jpg"),
    moonTexture : textureLoader.load("/textures/2k_moon.jpg"),
    jupiterTexture : textureLoader.load("/textures/8k_jupiter.jpg"),
    saturnTexture : textureLoader.load("/textures/8k_saturn.jpg"),
    uranusTexture : textureLoader.load("/textures/2k_uranus.jpg"),
    neptuneTexture : textureLoader.load("/textures/2k_neptune.jpg"),
    ringTexture : textureLoader.load("/textures/radial_saturn_ring.png"),
    backgroundCubemap : cubeTextureLoader
    .load( [
      'px.png',
      'nx.png',
      'py.png',
      'ny.png',
      'pz.png',
      'nz.png'
    ] ),
}

Object.values(textures).forEach(texture => {
  if (texture) texture.colorSpace = THREE.SRGBColorSpace;
});

export default textures