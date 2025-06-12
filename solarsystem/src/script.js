import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { Pane } from "tweakpane";
import textures from "./textures";
import planets from "./planetData";

const BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);

const pane = new Pane();

const scene = new THREE.Scene();

scene.background = textures.backgroundCubemap


const moonMaterial = new THREE.MeshStandardMaterial({
  map: textures.moonTexture,
});

const ringMaterial = new THREE.MeshBasicMaterial({
  map: textures.ringTexture,
  // color: 'gray',
  side: THREE.DoubleSide,
  transparent: true,
  alphaTest: 0.1,
  depthWrite: true
})

const sphereGeometry = new THREE.SphereGeometry(1,32,32);

const ringGeometry = new THREE.RingGeometry(2,3,64);
const ringMesh = new THREE.Mesh(ringGeometry,ringMaterial);
ringMesh.rotation.x = -Math.PI / 2;

const sunMaterial = new THREE.MeshBasicMaterial({map:textures.sunTexture})

const params = {
  threshold: 0.8,
  strength: 0.5,
  radius: 0,
  exposure: 0
};

const sun = new THREE.Mesh(
  sphereGeometry,
  sunMaterial
)
sun.scale.setScalar(13);
sun.layers.enable(BLOOM_SCENE);




scene.add(sun)

const createPlanet = (planet) => {
  const planetMesh = new THREE.Mesh(
    sphereGeometry,
    planet.material
  )

  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;
  return planetMesh;
}

const createMoon = (moon) => {
  const moonMesh = new THREE.Mesh(
      sphereGeometry,
      moonMaterial
    )

    moonMesh.scale.setScalar(moon.radius);
    moonMesh.position.x = moon.distance;
    moonMesh.userData.isMoon = true;
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

  if(planet.name == 'Saturn'){
    planetMesh.add(ringMesh);
  }

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
scene.add(pointerLight);

const speedOfPlanets = {};
planets.forEach((planet) => {
  speedOfPlanets[planet.name] = 1;
})

Object.keys(speedOfPlanets).forEach((name) => {
  pane.addBinding(speedOfPlanets,name, {
    min: 0,
    max: 10,
    label : name,
  })
})

const renderloop = () => {
  planetMeshes.forEach((planet,index) => {
    planet.rotation.y += planets[index].speed * speedOfPlanets[planets[index].name];
    planet.position.x = Math.sin(planet.rotation.y) * planets[index].distance;
    planet.position.z = Math.cos(planet.rotation.y) * planets[index].distance;
  
    planet.children.forEach((moon,moonIndex) => {
      if(moon.userData.isMoon){
        moon.rotation.y += planets[index].moons[moonIndex].speed;
        moon.position.x = Math.sin(moon.rotation.y) * planets[index].moons[moonIndex].distance
        moon.position.z = Math.cos(moon.rotation.y) * planets[index].moons[moonIndex].distance
      }
    })
  
  })

  controls.update();
  composer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};


renderloop();
