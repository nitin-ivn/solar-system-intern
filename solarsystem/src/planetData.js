import textures from "./textures";
import * as THREE from 'three'


//Materials for all planets
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map:textures.mercuryTexture,
})
const venusMaterial = new THREE.MeshStandardMaterial({
  map: textures.venusTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: textures.earthTexture, 
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: textures.marsTexture,
});

const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: textures.jupiterTexture,
})

const saturnMaterial = new THREE.MeshStandardMaterial({ 
  map: textures.saturnTexture 
});
const uranusMaterial = new THREE.MeshStandardMaterial({ 
  map: textures.uranusTexture 
});
const neptuneMaterial = new THREE.MeshStandardMaterial({ 
  map: textures.neptuneTexture 
});


//planet data
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
  radius: 5,
  distance: 130,
  speed: 0.0017,
  material: saturnMaterial,
  moons: [
    {
      name: "Titan",
      radius: 0.25,
      distance: 3,
      speed: 0.008,
    },
    {
      name: "Enceladus",
      radius: 0.2,
      distance: 2,
      speed: 0.01,
    },
  ],
  },
  {
  name: "Uranus",
  radius: 4.5,
  distance: 180,
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
    distance: 225,
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

export default planets;