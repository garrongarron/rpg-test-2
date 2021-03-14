import longTimeAgo from "./LongTimeAgo.js"
import play from './Music.js'
// import init from '../basic/Renderer.js'
import goTo from '../scenes/SceneHandler.js';
import { loadPalading } from "../loader/Loader.js";

let btn = document.createElement('div')
btn.innerHTML = "Play Now"
btn.classList.add('beating1')
btn.addEventListener('click', () => {
    play()

    document.querySelector('#container').classList.add('fadeOut')
    btn.classList.remove('beating1')
    btn.classList.add('fadeOut2')
    title.classList.add('fadeOut2')
    setTimeout(() => {
        btn.classList.add('hide')
        title.classList.add('hide')
    }, 2000);
    setTimeout(() => {
        document.querySelector('#container').classList.add('hide')
        start = true
        loadPalading().then((paladin)=>{
            longTimeAgo()
            goTo('intro')
        })
         
        // init()//HERE
        // setTimeout(() => {
            
        // }, 4*1000);
    }, 4*1000);
})


let title = document.createElement('h1')
title.innerText = 'The Warrior'

let container = document.createElement('div')
container.appendChild(title)
container.appendChild(btn)

container.classList.add('play-now')
document.body.appendChild(container)



let start = false
let startGame = () => {
    return start
}
export default startGame

