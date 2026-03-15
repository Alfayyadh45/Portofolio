import * as three from './node_modules/three/build/three.module.js';



const contWidth = document.querySelector('.cars').clientWidth;
const contHeight = document.querySelector('.cars').clientHeight;

const cam = new three.PerspectiveCamera(75, contWidth/contHeight, 1, 1000);
const scene = new three.Scene();
const renderer = new three.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(devicePixelRatio);



// ! object
const block = new three.BoxGeometry(1, 1, 1);
const mat = new three.MeshBasicMaterial({ color: 'red' });
const cube = new three.Mesh(block, mat);



// ! rendering
cam.position.z = 10;
scene.add();

const container = document.querySelector('.cars');
container.appendChild(renderer.domElement);

function loopRender() {
    requestAnimationFrame(loopRender);
    renderer.render(scene, cam);
}
loopRender();