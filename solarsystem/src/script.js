import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { Pane } from "tweakpane";

const BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);

const pane = new Pane();

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('/textures/cubeMap/')

const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
sunTexture.colorSpace = THREE.SRGBColorSpace  
const mercuryTexture = textureLoader.load("/textures/2k_mercury.jpg");
mercuryTexture.colorSpace = THREE.SRGBColorSpace
const venusTexture = textureLoader.load("/textures/2k_venus_surface.jpg");
venusTexture.colorSpace = THREE.SRGBColorSpace
const earthTexture = textureLoader.load("/textures/2k_earth_daymap.jpg");
earthTexture.colorSpace = THREE.SRGBColorSpace
const marsTexture = textureLoader.load("/textures/2k_mars.jpg");
marsTexture.colorSpace = THREE.SRGBColorSpace
const moonTexture = textureLoader.load("/textures/2k_moon.jpg");
moonTexture.colorSpace = THREE.SRGBColorSpace
const jupiterTexture = textureLoader.load("/textures/8k_jupiter.jpg");
jupiterTexture.colorSpace = THREE.SRGBColorSpace
const saturnTexture = textureLoader.load("/textures/8k_saturn.jpg");
saturnTexture.colorSpace = THREE.SRGBColorSpace;
const uranusTexture = textureLoader.load("/textures/2k_uranus.jpg");
uranusTexture.colorSpace = THREE.SRGBColorSpace;
const neptuneTexture = textureLoader.load("/textures/2k_neptune.jpg");
neptuneTexture.colorSpace = THREE.SRGBColorSpace;
const ringTexture = textureLoader.load("/textures/8k_saturn_ring_alpha.png");
ringTexture.colorSpace = THREE.SRGBColorSpace;

console.log(jupiterTexture);



const backgroundCubemap = cubeTextureLoader
.load( [
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
] );

scene.background = backgroundCubemap

const mercuryMaterial = new THREE.MeshStandardMaterial({
  map:mercuryTexture
})
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture, 
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});

const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
})

const saturnMaterial = new THREE.MeshStandardMaterial({ 
  map: saturnTexture 
});
const uranusMaterial = new THREE.MeshStandardMaterial({ 
  map: uranusTexture 
});
const neptuneMaterial = new THREE.MeshStandardMaterial({ 
  map: neptuneTexture 
});

const ringMaterial = new THREE.MeshStandardMaterial({
  map: ringTexture,
  side: THREE.DoubleSide,
  transparent:true,
})

const sphereGeometry = new THREE.SphereGeometry(1,32,32);

const ringGeometry = new THREE.RingGeometry(6,10,64);
const ringMesh = new THREE.Mesh(ringGeometry,ringMaterial);
ringMesh.rotation.x = -Math.PI / 2;

const sunMaterial = new THREE.MeshBasicMaterial({map:sunTexture})

const params = {
  threshold: 0.6,
  strength: 1,
  radius: 0,
  exposure: 0
};

const sun = new THREE.Mesh(
  sphereGeometry,
  sunMaterial
)
sun.scale.setScalar(13);
sun.layers.enable(BLOOM_SCENE);


const planets = [
  {
    name: "Mercury",
    radius: 1,
    distance: 25,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 1.6,
    distance: 35,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 2,
    distance: 45,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 1.4,
    distance: 55,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.2,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.4,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Jupiter",
    radius: 7,
    distance: 80,
    speed : 0.002,
    material : jupiterMaterial,
    moons: [
      {
        name: "Io",
        radius: 0.2,
        distance: 2,
        speed: 0.015,
      },
      {
        name: "Europa",
        radius: 0.1,
        distance: 2.5,
        speed: 0.009,
      },
      {
        name: "Ganymede",
        radius: 0.09,
        distance: 3,
        speed: 0.01,
      },
    ]
  },
  {
  name: "Saturn",
  radius: 6,
  distance: 130,
  speed: 0.0017,
  material: saturnMaterial,
  moons: [
    {
      name: "Titan",
      radius: 0.1,
      distance: 3,
      speed: 0.008,
    },
    {
      name: "Enceladus",
      radius: 0.2,
      distance: 1,
      speed: 0.01,
    },
  ],
  },
  {
  name: "Uranus",
  radius: 4.5,
  distance: 160,
  speed: 0.0012,
  material: uranusMaterial,
  moons: [
    {
      name: "Titania",
      radius: 0.4,
      distance: 2,
      speed: 0.008,
    },
    {
      name: "Oberon",
      radius: 0.3,
      distance: 3,
      speed: 0.007,
    },
  ],
  },
  {
    name: "Neptune",
    radius: 4.4,
    distance: 195,
    speed: 0.001,
    material: neptuneMaterial,
    moons: [
      {
        name: "Triton",
        radius: 0.5,
        distance: 2,
        speed: 0.008,
      },
    ],
  },
]; 




scene.add(sun)

const createPlanet = (planet) => {
  const planetMesh = new THREE.Mesh(
    sphereGeometry,
    planet.material
  )
  planetMesh.add(ringMesh);

  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;
  return planetMesh;
}

const createMoon =(moon) => {
  const moonMesh = new THREE.Mesh(
      sphereGeometry,
      moonMaterial
    )

    moonMesh.scale.setScalar(moon.radius);
    moonMesh.position.x = moon.distance;
    return moonMesh;
}

const createOrbitRing = (radius) => {
  const segments = 128;
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    points.push(new THREE.Vector3(x, 0, z));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2,
  });

  const line = new THREE.Line(geometry, material);
  return line;
};


const planetMeshes = planets.map((planet) => {
  const planetMesh = createPlanet(planet);
  scene.add(planetMesh);

  const orbit = createOrbitRing(planet.distance);
  scene.add(orbit)

  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  })
  return planetMesh;
})

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 300;
camera.position.y = 10;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  params.strength,
  params.radius,
  params.threshold
);

const outputPass = new OutputPass();

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);
composer.addPass(outputPass);


const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 800;
controls.minDistance = 20

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const ambientLight = new THREE.AmbientLight(0xffffff,0.01);
scene.add(ambientLight)

const pointerLight = new THREE.PointLight(
  0xffffff,
  10000 
)
scene.add(pointerLight)

const renderloop = () => {
  planetMeshes.forEach((planet,index) => {
    console.log(planets[index].speed);
    planet.rotation.y += planets[index].speed;
    planet.position.x = Math.sin(planet.rotation.y) * planets[index].distance;
    planet.position.z = Math.cos(planet.rotation.y) * planets[index].distance;
  
    planet.children.forEach((moon,moonIndex) => {
      moon.rotation.y += planets[index].moons[moonIndex].speed;
      moon.position.x = Math.sin(moon.rotation.y) * planets[index].moons[moonIndex].distance
      moon.position.z = Math.cos(moon.rotation.y) * planets[index].moons[moonIndex].distance
    })
  
  })

  controls.update();
  composer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};


renderloop();
