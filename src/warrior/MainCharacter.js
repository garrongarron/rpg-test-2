import character, { createDb } from './CharacterPull.js'
import getAnimations from './AnimationLoader.js'

let paladinReady = null
// let characterLoaded = new Promise((resolve, reject) => {
//     let timer = setInterval(() => {
//         let paladin = character.createObjByName('Paladin')
//         if (paladin) {
//             clearTimeout(timer)
//             resolve(paladin)
//         }
//     }, 2 * 1000);
// })

// let outPromise = new Promise((resolve, reject) => {
//     let animations = null
//     characterLoaded.then((paladin) => {
//         let timer = setInterval(() => {
//             animations = getAnimations().map(anim => anim)
//             if (animations.length) {
//                 clearInterval(timer)
//                 addAnimations(paladin)
//             }
//         }, 2 * 1000);
//     })

//     let addAnimations = (paladin) => {
//         animations[0] = paladin.animations[0]
//         paladin.animations = animations
//         paladin.traverse(function (child) {
//             if (child.isMesh) {
//                 child.castShadow = true;
//                 child.receiveShadow = true;
//             }
//         });
//         paladinReady = paladin
//         resolve(paladin)
//     }
// })

let getPaladinPromise = () => {
    // createDb()//loading delay 
    return character.createInPromise('paladin')
    // return outPromise
}
let getPaladinOrNull = () => {
    return paladinReady
}

export default getPaladinPromise
export { getPaladinOrNull }