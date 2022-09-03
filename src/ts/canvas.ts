export const mainCanvasId = "mainCanvas"
export const mainCanvas = document.getElementById(mainCanvasId) as HTMLCanvasElement
if (!mainCanvas) {
    throw new Error("Can't find the main canvas with id '" + mainCanvasId + "'")
}

export function fullscreenCanvas(canvas: HTMLCanvasElement): boolean {
    const anyCanvas: any = canvas
    if (anyCanvas.requestFullScreen) {
        anyCanvas.requestFullScreen()
    } else if (anyCanvas.requestFullscreen) {
        anyCanvas.requestFullscreen()
    } else if (anyCanvas.webkitRequestFullScreen) {
        anyCanvas.webkitRequestFullScreen()
    } else if (anyCanvas.mozRequestFullScreen) {
        anyCanvas.mozRequestFullScreen()
    } else {
        return false
    }
    return true
}
