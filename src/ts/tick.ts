import { Awaitable } from "./base"

export async function loadTick(
    maxTries: number = 10
): Promise<string> {
    let tries: number = 0
    let text: string = ""
    while (tries < maxTries) {
        try {
            const resp = await fetch("last.tick")
            if (resp.status !== 200) {
                throw new Error(
                    "Status is not 200! Status: " +
                    resp.status + ": " + resp.statusText
                )
            }
            text = await resp.text()
            if (text.length === 0) {
                throw new Error("Response text of tick is empty.")
            }
        } catch (err) {
            if (tries >= maxTries) {
                throw err
            }
        }
    }
    if (text.length === 0) {
        throw new Error("Response text of tick is empty.")
    }
    return text
}

export let initTick: string = ""
export let tickPromise: Promise<void>


export async function reloadOnTickChange(
    onChange: () => Awaitable<void> =
        () => {
            document.body.innerHTML = ""
            window.location.reload()
        },
    verbose: boolean = false,
    checkMillis: number = 300,
    waitCheckMillis: number = 16,
): Promise<void> {
    let initLoopTick = initTick = await loadTick()
    let lastTick: string = initLoopTick
    let preTick: string = initLoopTick
    do {
        lastTick = await loadTick()
        if (
            lastTick === "wait" &&
            preTick !== "wait"
        ) {
            verbose && console.log("Prepare for changes!")
        } else if (
            lastTick !== "wait" &&
            preTick === "wait"
        ) {
            verbose && console.log("Stop prepare for changes!")
        }
        preTick = lastTick

        await new Promise<void>(
            (res) => setTimeout(
                () => res(),
                lastTick === "wait" ?
                    waitCheckMillis :
                    checkMillis
            )
        )
    } while (
        (
            lastTick === "wait" ||
            lastTick == initTick
        ) &&
        initLoopTick ===
        initTick
    )
    if (
        initLoopTick !==
        initTick
    ) {
        verbose && console.log("New tick check loop")
        return
    }
    verbose && console.log("Tick change!")
    await onChange()
}
