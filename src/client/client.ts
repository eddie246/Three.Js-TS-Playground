import * as THREE from 'three';
import { OrthographicCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Threejs needs: 1. scene, 2. camera, 3. renderer
//Scene: a tree-like structure of Meshes, Lights, 3D positions, cameras
//Camera: Describes the view boundaries, of the scene within the Frustum dimensions
//Renderer: Takes Scene and Camera data and renders onto HTML as canvas

const scene = new THREE.Scene();
const scene2 = new THREE.Scene();

const camera1 = new THREE.PerspectiveCamera( //Camera view is shaped like a cone, has perspective aspect
  75, //Perspective: How 3D something looks
  window.innerWidth / window.innerHeight, //Aspect Ratio
  0.1, //Nearplane: Anything under this is not rendered: too close to camera
  1000 //Farplane: Anything past this is not rendered: Outside of the render view bounds
);

const camera2 = new OrthographicCamera( //Camera view is shaped like a cube, does not have perspective aspect
  -2, //left
  2, //right
  2, //top
  -2, //bottom
  0.1, //Nearplane
  10 //Farplane
);

const camera3 = new OrthographicCamera(-2, 2, 2, -2);
const camera4 = new OrthographicCamera(-2, 2, 2, -2);

camera1.position.z = 2;
camera2.position.z = 2;
camera3.position.y = 2;
camera3.lookAt(new THREE.Vector3());
camera4.position.x = -2;
camera4.lookAt(new THREE.Vector3());

//Default and fastest renderer is WebGL
//NOTE: must give a size using setSize, Should also have an eventlistener for resizing
//Renderer creates a canvas BHTS and must be dynamically appenend to the DOM using appendChild or hardcode canvas in HTML

// Via AppendChild to DOM:
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const canvas1 = document.getElementById('c1') as HTMLCanvasElement;
const canvas2 = document.getElementById('c2') as HTMLCanvasElement;
const canvas3 = document.getElementById('c3') as HTMLCanvasElement;
const canvas4 = document.getElementById('c4') as HTMLCanvasElement;

const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 });
renderer1.setSize(300, 300);

const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 });
renderer1.setSize(300, 300);

const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3 });
renderer1.setSize(300, 300);

const renderer4 = new THREE.WebGLRenderer({ canvas: canvas4 });
renderer1.setSize(300, 300);

//Allows user to interact with camera (pan, rotate, zoom)
new OrbitControls(camera1, renderer1.domElement);

const cubeGeometry = new THREE.BoxGeometry();
const torusGeometry = new THREE.TorusKnotGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(cubeGeometry, material);
// scene.add(cube);

const torus = new THREE.Mesh(torusGeometry, material);
const torus2 = new THREE.Mesh(torusGeometry, material);
torus.scale.x = 0.5;
torus.scale.y = 0.5;
torus.scale.z = 0.5;
scene.add(torus);
scene2.add(torus2);

//Resize listener
//Should update aspect ratio inaddition to canvas dimentions
// window.addEventListener('resize', onWindowResize, false);
// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   render();
// }

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  torus2.rotation.x += 0.01;
  torus2.rotation.y += 0.01;

  render();
}

function render() {
  renderer1.render(scene, camera1);
  renderer2.render(scene, camera2);
  renderer3.render(scene2, camera3);
  renderer4.render(scene, camera4);
}

animate();
