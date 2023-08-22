import * as THREE from './node_modules/three/build/three.module.js';
import "./styles.css"
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls'

//Scene 
const scene = new THREE.Scene() 

//Create our sphere
const geometry = new THREE.TorusGeometry(3, 1)
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Sizes 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Lights 
const light = new THREE.PointLight(0xffffff, 15, 100)
light.position.set(7,7,7)
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height)
camera.position.z = 20
scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)


//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = true
controls.autoRotate = true
controls.autoRotateSpeed = 6

//Resize
window.addEventListener("resize", () => {
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //update camera 
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()