import scene from '../basic/Scene.js'
import camera from '../basic/Camera.js'
import { directionalLight, ambientLight, hemiLight, pointLight } from '../basic/Lights.js'
import box from '../objects/Box.js'
import sky from '../sky/Sky.js'
import setFog, { resetFog } from '../basic/Fog.js'
import { Color } from 'three'

class Scene2 {
    constructor(goTo) {
        this.keyListener = [this.next.bind(this)]
        this.goTo = goTo
        this.originalData = {}
    }
    next() {
        this.goTo('intro')
    }
    start() {
        this.originalData['directional'] = directionalLight.intensity
        directionalLight.intensity = 0.01
        scene.add(directionalLight);
        scene.add(ambientLight);
        this.originalData['hemi'] = hemiLight.intensity
        hemiLight.intensity = 0.01
        scene.add(hemiLight);
        scene.add(pointLight);
        scene.add(box)
        camera.lookAt(box.position)
        scene.add(sky)
        sky.material.uniforms.topColor.value = new Color(0x000000);
        sky.material.uniforms.bottomColor.value = new Color(0x000033);
        sky.material.uniforms.offset.value = 1;
        setFog(scene)
        document.addEventListener('click', this.keyListener[0])
    }
    stop() {
        directionalLight.intensity = this.originalData.directional
        hemiLight.intensity = this.originalData.hemi
        scene.remove(directionalLight);
        scene.remove(ambientLight);
        scene.remove(hemiLight);
        scene.remove(pointLight);
        scene.remove(box)
        sky.material.uniforms.topColor.value = new Color(0x81C1E2);
        sky.material.uniforms.bottomColor.value = new Color(0xf9cf8d);
        sky.material.uniforms.offset.value = 10;
        scene.remove(sky)
        resetFog(scene)
        document.removeEventListener('click', this.keyListener[0])
    }
}

export default Scene2