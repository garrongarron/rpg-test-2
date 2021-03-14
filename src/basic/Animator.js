import machine from './Machine.js'
import { AnimationMixer, Clock } from 'three'
let interpolationTime = .2

class Animator {
    constructor(mesh) {
        this.mixer = new AnimationMixer(mesh)
        this.clock = new Clock()
        this.inProgress = false
        this.onLoopFinished = function () {
            this.inProgress = false
        }
        this.working = true
        machine.addCallback(() => {
            if(this.working){
                this.mixer.update(this.clock.getDelta());
            }
        })
        this.clips = mesh.animations.map(animation => {
            return this.mixer.clipAction(animation)
        })
        this.lastClip = null
    }
    action(m, timeScale, loop) {
        //wait for loop
        if (this.inProgress) return
        if (loop) {
            this.mixer.addEventListener('loop', this.onLoopFinished.bind(this));
            this.inProgress = true
        }
        //speed uot
        this.mixer.timeScale = timeScale
        //first time
        if (this.lastClip === null) {
            this.clips[m].play();
            this.lastClip = m
            return
        }
        //repetition
        if (this.lastClip == m) return
        //crossFade
        this.clips[m].reset();
        this.clips[m].play();
        this.clips[this.lastClip].crossFadeTo(this.clips[m], interpolationTime, true);
        this.lastClip = m
    }

    on(){
        this.working = true
    }
    off(){
        this.working = true
    }
}

export default Animator