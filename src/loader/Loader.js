import { loadAnimations } from "../warrior/AnimationLoader";
import character from "../warrior/CharacterPull";

let paladin = null
let loadPalading = () => {
    if(paladin) return new Promise((res, rej)=>{res(paladin)})
    let paladingInPromise = character.createInPromise('Paladin')
    let animationInPromise = loadAnimations()

    let out = new Promise((resolve, reject)=>{
        Promise.all([paladingInPromise, animationInPromise]).then(response => {
            response[1][0] = response[0].animations[0]
            response[0].animations = response[1]
            paladin = response[0]
            resolve(paladin)
        })
    })
    return out
}

export { loadPalading }