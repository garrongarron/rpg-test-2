import musicFile from '../audio/ClashOfClans.mp3'
let audioMusic = document.createElement('audio')
audioMusic.src = musicFile
audioMusic.volume = 0.2;
document.body.appendChild(audioMusic)

let play = () => {
    audioMusic.play();

}
export default play