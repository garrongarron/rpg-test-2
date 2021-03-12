let p = document.createElement('p')

let container = document.createElement('div')
container.classList.add('shining')

let listText = [
    'Long time ago...',
    '...in a far away...',
    '...a brave warrior named Samu...',
    '...fight for something more than just his own happines..',
    '...he fought to free his people...'
]
// container.appendChild(title)
container.appendChild(p)
document.body.appendChild(container)
let longTimeAgo = () => {
    p.innerText = listText.shift()
    p.classList.add('gradient')

    let timer = null
    timer = setInterval(() => {
        if (listText.length == 0) {
            p.classList.remove('gradient')
            p.classList.add('hide')
            return
        }
        p.innerText = listText.shift()
        p.classList.remove('gradient')
        p.classList.add('hide')
        setTimeout(() => {
            p.classList.remove('hide')
            p.classList.add('gradient')
        }, 1000);
    }, 8 * 1000);
}
export default longTimeAgo