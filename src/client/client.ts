import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', render);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

//Gives stats like fps, latency, memory
const stats = Stats();
document.body.appendChild(stats.dom);

//GUI
const gui = new GUI();
const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(cube, 'visible');
const cubeRotationFolder = cubeFolder.addFolder('Cube Rotation');
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2);

const cubePositionFolder = cubeFolder.addFolder('Cube Position');
cubePositionFolder.add(cube.position, 'x', -10, 10);
cubePositionFolder.add(cube.position, 'y', -10, 10);
cubePositionFolder.add(cube.position, 'z', -10, 10);

const cubeScaleFolder = cubeFolder.addFolder('Cube Scale');
cubeScaleFolder.add(cube.scale, 'x', 0, 5);
cubeScaleFolder.add(cube.scale, 'y', 0, 5);
cubeScaleFolder.add(cube.scale, 'z', 0, 5);

function animate() {
  requestAnimationFrame(animate); //Calls itself based on the monitor refresh rate

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  render(); //redraws the canvas after

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
render();
