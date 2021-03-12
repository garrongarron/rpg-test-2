import { TextureLoader } from 'three'
import sand from '../images/sand-512.3.jpg'
import rock from '../images/rock-512.jpg'
import grass from '../images/demo/img/grass1.jpg'
import snow from '../images/demo/img/snow1.jpg'
let loadTextures = () => {
    var loader = new TextureLoader();

    // let promise1 = new Promise((resolve, reject) => { loader.load('demo/img/sand1.jpg', (t1) => { resolve(t1) }) })//images/sand-512.jpg
    let promise1 = new Promise((resolve, reject) => { loader.load(sand, (t1) => { resolve(t1) }) })//images/sand-512.jpg

    let promise2 = new Promise((resolve, reject) => { loader.load(grass, (t2) => { resolve(t2) }) })
    // let promise2 = new Promise((resolve, reject) => { loader.load('images/grass-512.jpg', (t2) => { resolve(t2) }) })



    // let promise3 = new Promise((resolve, reject) => { loader.load('demo/img/stone1.jpg', (t3) => { resolve(t3) }) })
    let promise3 = new Promise((resolve, reject) => { loader.load(rock, (t3) => { resolve(t3) }) })

    let promise4 = new Promise((resolve, reject) => { loader.load(snow, (t4) => { resolve(t4) }) })
    Promise.all([promise1, promise2, promise3, promise4]).then(t => {
        callbacks.map(callback => {
            callback(t)
        })
    })

}
let callbacks = []
let addCallback = (callback) => {
    callbacks.push(callback)
}

export default loadTextures
export { addCallback }