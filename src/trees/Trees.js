import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import fileList from "./FileList.js";

import gravity from '../gravity/Gravity.js'

let trees = []
let loadTrees = (scene) => {

    let load = () => {
        let n = 0

        //there are 6 trees
        trees = trees.map(object => {
            // object.position.set(n*4, 0, 0)
            let scale = 0.06
            object.scale.set(scale, scale, scale)
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            return object
        });

        // setTimeout(() => {
            let i = 0
            let nn = 0
            while (i < 20 && nn < 200) { //&& nn < 2000
                nn++
                let p = {
                    x: Math.random() * 100 - 50,
                    y: 0,
                    z: Math.random() * 500 +20
                }
                let g = gravity.check(p)
                if (g.tmp) {
                    p.y = 1 - g.tmp.distance
                    // if (p.y < 0.1) continue
                    // console.log(g.tmp.distance, p);
                    let tree = trees[Math.floor(Math.random() * trees.length)].clone()
                    tree.position.set(p.x, p.y, p.z)
                    scene.add(tree)
                    i++
                }
            }
        // }, 1);
    }

    const loader = new FBXLoader();
    let promises = []
    for (let index = 0; index < fileList.length; index++) {
        promises[index] = new Promise((resolve, reject) => {
            loader.load('dist/models/Threes/' + fileList[index] + '_1.fbx', function (object) {
                trees.push(object)
                resolve()
            })
        })
    }
    Promise.all(promises).then((a) => {
        load()
    })
}
export default loadTrees