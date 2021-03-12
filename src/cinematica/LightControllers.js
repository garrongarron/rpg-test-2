import { directionalLight, ambientLight, hemiLight } from '../basic/Lights.js'
import machine from '../basic/Machine.js'
import { getSky } from '../sky/Sky'

let dark = true
let start = 0
let sky = null
let ambientLightIntensity = null
let hemiLightIntensity = null
let color = {
    r: null,
    g: null,
    b: null,
}

let fogColor = {
    r: null,
    g: null,
    b: null,
}
let oscilation = null

let scene = null
let setColorScene = (sc) => {
    scene = sc
}

machine.addCallback(() => {
    start += 0.005
    oscilation = (Math.sin(start)+.5)/2
    
    if (oscilation < .01 || dark) {
        oscilation = 0.01
    }
    
    // -0.25
    directionalLight.intensity = oscilation
    if (ambientLightIntensity == null) {
        ambientLightIntensity = ambientLight.intensity
        hemiLightIntensity = hemiLight.intensity
    }
    ambientLight.intensity = ambientLightIntensity * oscilation
    hemiLight.intensity = hemiLightIntensity * oscilation

    if (sky == null) {
        sky = getSky()
        // console.log(sky.material.uniforms);    
        color.r = sky.material.uniforms.topColor.value.r
        color.g = sky.material.uniforms.topColor.value.g
        color.b = sky.material.uniforms.topColor.value.b
        console.log(color);
    } else {
        sky.material.uniforms.topColor.value.r = color.r * oscilation
        sky.material.uniforms.topColor.value.g = color.g * oscilation
        sky.material.uniforms.topColor.value.b = color.b * oscilation
    }

    if (scene != null && !fogColor.r) {
        fogColor.r = scene.fog.color.r
        fogColor.g = scene.fog.color.g
        fogColor.b = scene.fog.color.b
    }
    if (fogColor.r) {
        scene.fog.color.r = fogColor.r * oscilation
        scene.fog.color.g = fogColor.g * oscilation
        scene.fog.color.b = fogColor.b * oscilation
    }
})

let setDark = (bool) =>{
    dark = bool
}
export default setColorScene
export {setDark}