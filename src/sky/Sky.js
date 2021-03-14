import shaders from './SkyShaders.js'
import {Color, SphereGeometry, ShaderMaterial, Mesh} from 'three'

const uniforms = {
    "topColor": { value: new Color(0x81C1E2) },//0x2471A3 //0x377C9B //0x81C1E2//0x000000
    "bottomColor": { value: new Color(0xf9cf8d) },//0xf9cf8d //0xFB9B1A//0x000033
    "offset": { value: 10 },//1
    "exponent": { value: .3 }
};

const skyGeo = new SphereGeometry(900, 32, 15);
const skyMat = new ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaders._VS,
    fragmentShader: shaders._FS,
    side: 1 //THREE.BackSide
});

let sky = new Mesh(skyGeo, skyMat);

export default sky