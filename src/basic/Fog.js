import { Fog, Color } from 'three'

let setFog = (scene) => {
    // scene.background = new THREE.Color( 0xAED6F1 ) //new THREE.Color().setHSL(0.6, 0, 1);
    scene.fog = new Fog(scene.background, 50, 600);
    scene.fog.color.copy(new Color(0x8FA2A6));//85929E //8FA2A6 //
}
let resetFog = (scene) => {
    scene.fog.near = 0.1;
    scene.fog.far = 0;
}
export default setFog
export { resetFog }