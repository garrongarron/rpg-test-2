import scene from '../basic/Scene.js'
import camera from '../basic/Camera.js'
import { directionalLight, ambientLight, hemiLight, pointLight } from '../basic/Lights.js'
import box from '../objects/Box.js'
import sky from '../sky/Sky.js'
import setFog, { resetFog } from '../basic/Fog.js'
import { loadPalading } from '../loader/Loader.js'
import Animator from '../basic/Animator.js'
import { MathUtils } from 'three'
import machine from '../basic/Machine.js'
import { getDelta } from '../basic/Clock.js'
import show from './Scene1/Buttons.js'

class Scene1 {
    constructor(goTo) {
        this.keyListener = [this.next.bind(this)]
        this.goTo = goTo
        this.paladin = null
        this.animator = null
        this.machine = machine
        this.h = 8
        this.h_initial = 8
        this.limit = 2
        this.cb = () => {
            camera.lookAt(
                this.paladin.position.x,
                this.paladin.position.y + MathUtils.clamp(this.h, this.limit, this.h_initial),
                this.paladin.position.z,
            )
            this.h -= 0.01
            if (this.h < this.limit) {
                this.machine.removeCallback(this.cb)
                setTimeout(() => {
                    show()
                }, 10*1000);
            }
            console.log('a');
        }
    }
    next() {
        this.goTo('game')
    }
    start() {
        this.h = this.h_initial

        scene.add(directionalLight);
        scene.add(ambientLight);
        scene.add(hemiLight);
        scene.add(pointLight);
        // scene.add(box)


        setFog(scene)
        // document.addEventListener('click', this.keyListener[0])
        loadPalading().then(paladin => {
            this.paladin = paladin
            scene.add(paladin)
            setTimeout(() => {
                this.machine.addCallback(this.cb)

            }, 5 * 1000);
            camera.position.set(0, 2, -7)
            camera.lookAt(
                this.paladin.position.x,
                this.paladin.position.y + this.h,
                this.paladin.position.z,
            )
            this.animator = new Animator(this.paladin)
            this.animator.action(26, 1, true)
        })
    }
    stop() {
        scene.remove(directionalLight);
        scene.remove(ambientLight);
        scene.remove(hemiLight);
        scene.remove(pointLight);
        // scene.remove(box)
        // scene.remove(sky)
        resetFog(scene)
        this.machine.removeCallback(this.cb)
        scene.remove(this.paladin)
        // document.removeEventListener('click', this.keyListener[0])
        this.animator.off()
    }
}

export default Scene1
// directionalLight.intensity = 0.01
// ambientLight.intensity *= 0.01
// hemiLight.intensity *= 0.01
// sky.material.uniforms.topColor.value.r *= 0.01
// sky.material.uniforms.topColor.value.g *= 0.01
// sky.material.uniforms.topColor.value.b *= 0.01