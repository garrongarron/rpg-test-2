import startGame from './LoadGame.js'
import './Fire.js'
import { Camera, Scene, PlaneBufferGeometry, ShaderMaterial, Vector2, Mesh, WebGLRenderer} from 'three';
import vertexShaderFilename from '../shaders/vertexShader.glsl'//nuevo
import fragmentShaderFilename from '../shaders/fragmentShader.glsl'//nuevo

function readTextFile() {

    let vertex = new Promise((ok, fail) => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET",vertexShaderFilename, false);

        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    ok(allText)
                }
            }
        }
        rawFile.send()
    })

    let fragment = new Promise((ok, fail) => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", fragmentShaderFilename, false);

        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    ok(allText)
                }
            }
        }
        rawFile.send()
    })

    
    Promise.all([vertex, fragment]).then(shaders => {
        run(shaders)//[resultado 1, resultado 2]
    });
}

readTextFile()

let run = (shaders) => {    
    
    var container;
    var camera, scene, renderer;
    var uniforms;

    init();
    animate();
    

    function init() {
        
        let canvas = document.createElement('div')
        canvas.id = 'container'
        document.body.insertBefore(canvas, document.body.firstChild);
        container = document.getElementById('container');

        camera = new Camera();
        camera.position.z = 1;
        
        scene = new Scene();

        var geometry = new PlaneBufferGeometry(2, 2);

        uniforms = {
            u_time: { type: "f", value: 1.0 },
            u_resolution: { type: "v2", value: new Vector2() },
            u_mouse: { type: "v2", value: new Vector2() }
        };

        var material = new ShaderMaterial({
            uniforms: uniforms,
            vertexShader: shaders[0],
            fragmentShader: shaders[1]
        });

        var mesh = new Mesh(geometry, material);
        scene.add(mesh);

        renderer = new WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);

        container.appendChild(renderer.domElement);

        onWindowResize();
        window.addEventListener('resize', onWindowResize, false);

        document.onmousemove = function (e) {
            uniforms.u_mouse.value.x = e.pageX
            uniforms.u_mouse.value.y = e.pageY
        }
    }

    function onWindowResize(event) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.x = renderer.domElement.width;
        uniforms.u_resolution.value.y = renderer.domElement.height;
    }

    function animate() {
        if(startGame()) return
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        uniforms.u_time.value += 0.05;
        renderer.render(scene, camera);
    }
    // console.log();
}