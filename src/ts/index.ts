import { mainContentLoader, PrepareImageFunction } from './contentLoader';
import {
    Scene,
    Engine,
    FreeCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh
} from "babylonjs"
import * as hud from "./hud"
import * as canvas from "./canvas"
import * as tick from "./tick"
import {
    initScene
} from "./scenes/main"
import * as devtools from './devtools';

tick.reloadOnTickChange()
devtools.enableDevTools()

// Load the 3D engine
const engine = new Engine(
    canvas.mainCanvas,
    true,
    {
        preserveDrawingBuffer: true,
        stencil: true
    }
)

// the canvas/window resize event handler
window.addEventListener('resize', () => {
    engine.resize()
})

export async function init(): Promise<void> {
    const mainScene = await initScene(
        engine,
        canvas.mainCanvas
    )

    // run the render loop
    engine.runRenderLoop(() => {
        mainScene.render()
    })

    const imgSrc = "img/crosshair.png"
    const imagePrepare: PrepareImageFunction = (img) => {
        img.style.width = "120px"
        img.style.height = "120px"
    }

    hud.hud.tr.appendChild(await mainContentLoader.loadImg(imgSrc, imagePrepare))
    hud.hud.tc.appendChild(await mainContentLoader.loadImg(imgSrc, imagePrepare))
    hud.hud.cc.appendChild(await mainContentLoader.loadImg(imgSrc, imagePrepare))
    hud.hud.cr.appendChild(await mainContentLoader.loadImg(imgSrc, imagePrepare))
    hud.hud.br.appendChild(await mainContentLoader.loadImg(imgSrc, imagePrepare))
}
init()

setInterval(() => {
    if (hud.isHudHelperEnabled()) {
        hud.disableHudHelper()
    } else {
        hud.enableHudHelper()
    }
}, 1000 * 3)

