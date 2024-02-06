import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const main = () => {
  // Canvas
  const canvas = document.querySelector('canvas.webgl');
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Scene
  const scene = new THREE.Scene();

  // Renderer
  const renderer = new THREE.WebGL1Renderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Camera
  const fov = 75;
  const aspect = sizes.width / sizes.height;
  const near = 0.1;
  const far = 100;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(1, 1, 3);

  scene.add(camera);

  // Object(s)
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // Cursor Controls
  const cursor = {
    x: 0,
    y: 0,
  };

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // Listeners
  window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5; // negate for y axis
  });

  window.addEventListener('resize', () => {
    // Update Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);
  });

  const tick = () => {
    controls.update();

    // Render
    renderer.render(scene, camera);
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  return tick();
};

main();
