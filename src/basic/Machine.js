let on = true
let prev = new Date().getTime() -100
class Machine {
    constructor() {
        this.callbacks = []
        
    }
    addCallback(callback) {
        if (typeof callback === 'function') {
            this.callbacks.push(callback)
        }
    }
    run() {
        let currentTime = new Date().getTime()
        let diff = currentTime - prev
        if ( diff < 32) {//16/1000
            // console.log(diff, 'jumping');
            requestAnimationFrame(machine.run)
            return
        }
        prev = currentTime
        
        machine.callbacks.forEach(func => func())
        if (on) {
            requestAnimationFrame(machine.run)
        }
    }

    off() {
        on = false
    }
    on() {
        on = true
        this.run()
    }
}

const machine = new Machine()
export default machine