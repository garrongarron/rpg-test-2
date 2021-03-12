import { Scene } from 'three';

import { directionalLight, ambientLight, hemiLight, pointLight } from './Lights.js'
import box from '../objects/Box.js'
import getPaladinPromise from '../warrior/MainCharacter.js';

import loadPlaneTerrain, { setTarget } from '../terrain/PlaneTerrain.js'
import setSky from '../sky/Sky.js'
import setFog from '../basic/Fog.js'
import  setWarrior from '../cinematica/Intro.js'
import loadTrees from '../trees/Trees.js'
import setColorScene  from '../cinematica/LightControllers.js'



const scene = new Scene();

scene.add(directionalLight);
scene.add(ambientLight);
scene.add(hemiLight);
scene.add(pointLight);

setSky(scene)
setFog(scene)

// scene.add(box)

let loadWarrior = () => {
    getPaladinPromise().then(paladin => {
        scene.add(paladin)
        paladin.position.set(0, -2, 0)
        setWarrior(paladin)
        // paladin.position.set(123.66827816140201, -0.6073749816485225, -142.87066427145885)
        // skyFollow(() => paladin)
        // mouseController(paladin)
        // setCharacterToSpawn(paladin, scene)
        // setTarget(paladin)//terrain
        // inFront(paladin, scene)
        // getInventory(paladin, scene)
    })
    loadPlaneTerrain(scene)
}

loadTrees(scene)//ok

setColorScene(scene)

export default scene
export { loadWarrior }