let tutorial = document.createElement('div')
tutorial.classList.add('scene1-tutorial')
tutorial.innerText = 'Tutorial'

let start = document.createElement('div')
start.classList.add('scene1-start')
start.innerText = 'Start'


let background = document.createElement('div')
background.classList.add('scene1-background')


let menu = document.createElement('div')
menu.classList.add('scene1-menu')
menu.classList.add('hide')

menu.appendChild(background)
menu.appendChild(start)
menu.appendChild(tutorial)




let show = () => {
    menu.classList.remove('hide')
    menu.classList.add('fadeIn')
    
    document.body.appendChild(menu)
}
let hide = () => {
    menu.classList.add('hide')
}

tutorial.addEventListener('click', () => {
    alert('tutorial')
    hide()
})
start.addEventListener('click', () => {
    alert('start')
    hide()
})

export default show