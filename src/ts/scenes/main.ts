import {
    Scene,
    Engine,
    FreeCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    SceneSerializer,
} from "babylonjs"

// CreateScene function that creates and return the scene
export async function initScene(
    engine: Engine,
    canvas: HTMLCanvasElement,
): Promise<Scene> {
    // Create a basic BJS Scene object
    const scene = new Scene(engine)
    // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene)
    // Target the camera to scene origin
    camera.setTarget(Vector3.Zero())
    // Attach the camera to the canvas
    camera.attachControl(canvas, false)
    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene)
    // Create a built-in "sphere" shape its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
    const sphere1 = MeshBuilder.CreateSphere(
        "sphere1",
        {
            segments: 16,
            diameter: 2,
            updatable: false,
            sideOrientation: Mesh.FRONTSIDE,
        },
        scene,
    )
    

    // Move the sphere upward 1/2 of its height
    sphere1.position.y = 1

    const sphere2 = MeshBuilder.CreateSphere(
        "sphere2",
        {
            segments: 16,
            diameter: 1,
            diameterX: 6,
            diameterZ: 6,
            updatable: false,
            sideOrientation: Mesh.FRONTSIDE,
        },
        scene,
    )
    // Move the sphere upward 1/2 of its height
    sphere2.position.y = 1.5
    sphere2.position.x = 4.2
    sphere2.position.z = -3.2

    const sphere3 = MeshBuilder.CreateSphere(
        "sphere3",
        {
            segments: 8,
            diameter: 3,
            diameterX: 5,
            diameterZ: 5,
            updatable: false,
            sideOrientation: Mesh.FRONTSIDE,
        },
        scene,
    )
    // Move the sphere upward 1/2 of its height
    sphere3.position.y = 1.3
    sphere3.position.x = 6.2
    sphere3.position.z = 2.2

    // Create a built-in "ground" shape its constructor takes 6 params : name, width, height, subdivision, scene, updatable
    const ground = MeshBuilder.CreateGround(
        "sphere1",
        {
            width: 12,
            height: 12,
            subdivisions: 2,
            updatable: false,
        },
        scene,
    )
    return scene
}

export default initScene
