import camera from '../basic/Camera.js'
import machine from '../basic/Machine.js'
import { getDelta } from '../basic/Clock.js'
import Animator from '../basic/Animator.js'
import { directionalLight, ambientLight, hemiLight, pointLight } from '../basic/Lights.js'
import { getSky } from '../sky/Sky'
import { Color } from 'three'

directionalLight.intensity = 0.01
ambientLight.intensity = 0.005
pointLight.intensity = 1
pointLight.distance = 20
pointLight.position.set(0, 5, -5);
setTimeout(() => {
    let sky = getSky()
    sky.material.uniforms.topColor.value = new Color(0x000000);
    sky.material.uniforms.bottomColor.value = new Color(0x000033);
    sky.material.uniforms.offset.value = 1;
}, 5000);

let warrior = null
let warrior2 = null
let h = 20
let cameraOut = false
camera.position.z = -15
machine.addCallback(() => {
    if (warrior) {
        let x, z
        x = warrior.position.x
        h = h - getDelta()*1.5
        z = warrior.position.z
        camera.lookAt(x, h, z)
        if (h + .5 < camera.position.y) {
            warrior2 = warrior
            warrior = null
            setTimeout(() => {
                cameraOut = true
                animator.action(36, 1, true)
                setTimeout(() => {
                    cameraOut = false
                }, 2 * 1000);
            }, 18 * 1000);
        }
    }
    if (cameraOut) {
        warrior2.position.set(
            warrior2.position.x,
            warrior2.position.y,
            warrior2.position.z - getDelta() * 2
        )
    }
    camera.position.set(
        camera.position.x,
        camera.position.y,
        camera.position.z + getDelta() / 3,
    )
})
let animator
let setWarrior = (w) => {
    setTimeout(() => {
        machine.run()
        warrior = w
        animator = new Animator(warrior)
        animator.action(26, 1, true)
    }, 8 * 1000);
}
export default setWarrior
