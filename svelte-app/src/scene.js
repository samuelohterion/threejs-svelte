import * as THREE from 'three';
import { addExperimentalCube } from './my_cube';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
let renderer;
cube.translateX(-1);
scene.add(cube);
const cube2 = addExperimentalCube();
scene.add(cube2);

camera.position.z = 5;
var my_time = 0;
const animate = () => {
  requestAnimationFrame(animate);
  my_time += 1;
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.01;
  cube2.rotation.x += 0.02;
  cube2.rotation.y += 0.03;
  cube2.material.uniforms.colorA["value"].r = Math.sin(6.283 * (my_time % 255) / 255.);
  cube2.material.uniforms.colorA["value"].g = Math.sin(6.283 * ((50 + my_time) % 255) / 255.);
  cube2.material.uniforms.colorA["value"].b = Math.sin(6.283 * ((100 + my_time) % 255) / 255.);
  renderer.render(scene, camera);
};

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

export const createScene = (el) => {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  resize();
  animate();
}

window.addEventListener('resize', resize);