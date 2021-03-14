import machine from '../basic/Machine.js'
import init from '../basic/Renderer.js'
import Scene1 from './Scene1.js'
import Scene2 from './Scene2.js'


let currentScene = null

let firstTime = true
let goTo = (sceneName) => {
    if (firstTime) {
        init()
        machine.on()    
        firstTime = false
    }
    if (currentScene != null) {
        scenes[currentScene].stop()
    }
    // console.log('goto', sceneName);
    scenes[sceneName].start()
    
    currentScene = sceneName
}
let scenes = {
    intro: new Scene1(goTo),
    game: new Scene2(goTo),
    tutorial: new Scene1(goTo)
}
export default goTo