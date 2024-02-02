import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600
}

// Camera
const frustrum = {
  fov: 75,
  aspect: sizes.width / sizes.height,
  near: 0.1,
  far: 6
}
const camera = new THREE.PerspectiveCamera(
  frustrum.fov,
  frustrum.aspect, 
  frustrum.near, 
  frustrum.far
  )
camera.position.z = 3

scene.add(camera)

// Rendered
const renderer = new THREE.WebGL1Renderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
