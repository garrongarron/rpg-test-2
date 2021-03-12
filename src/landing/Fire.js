let fire = document.createElement('div')
fire.classList.add('fire')
for (let index = 0; index < 150; index++) {
    let particle = document.createElement('div')
    particle.classList.add('particle')
    fire.appendChild(particle)
}
document.body.appendChild(fire)