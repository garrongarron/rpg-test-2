import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import fileList from "./FileList.js";


let animations = []
let promises = []
let ready = false
let loader = new FBXLoader();

let loadAnimations = (callback) => {
    let animFrecuentlyUsed = [26, 35, 36, 49, 48, 50, 51, 17, 41, 10, 52, 26]
    for (let index = 1; index < fileList.length; index++) {
        if (!animFrecuentlyUsed.includes(index)) continue
        promises[index] = new Promise((resolve, reject) => {
            loader.load('dist/models/SwordAndShield/' + fileList[index], function (object) {
                animations[index] = object.animations[0]
                resolve(index)
            })
        })
    }

    
    let out  = new Promise((resolve, reject)=>{
        Promise.all(promises).then(() => {
            ready = true
            if(typeof callback === 'function') callback(animations)
            resolve(animations)
        })
    })
    return out
    // console.log('start loading animations');
}


let getAnimations = () => {
    if (!ready) return []
    return animations
}
export default getAnimations
export { loadAnimations }