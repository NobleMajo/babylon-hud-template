

export const mainHtmlId = "html"
export const mainHtml = document.getElementById(mainHtmlId) as HTMLHtmlElement
if (!mainHtml) {
    throw new Error("Can't find the main html element with id '" + mainHtmlId + "'")
}

export async function reload(
    gc: boolean = true,
    earlyBlankPage: boolean = true,
    url: string = "index.html",
): Promise<void> {
    if (earlyBlankPage) {
        mainHtml.innerHTML = ""
    }
    if (gc) {
        triggerGc()
    }
    const resp = await fetch(url)
    if (resp.status !== 200) {
        throw new Error(
            "Status is not 200! Status: " +
            resp.status + ": " + resp.statusText
        )
    }
    const text = await resp.text()
    if (text.length === 0) {
        throw new Error("REesponse text of tick is empty.")
    }
    if (gc) {
        triggerGc()
    }
    mainHtml.innerHTML = text
}

export function triggerGc(): void {
    if (
        typeof (gc as any) === "function"
    ) {
        try {
            (gc as any)()
        } catch (e) { }
    }
    if (
        typeof (window as any).CollectGarbage === "function"
    ) {
        try {
            (window as any).CollectGarbage()
        } catch (e) { }
    }
    if (
        typeof (window as any).gc === "function"
    ) {
        try {
            (window as any).gc()
        } catch (e) { }
    }
    if (
        typeof (window as any).opera === "object" &&
        typeof (window as any).opera.collect === "object"
    ) {
        try {
            (window as any).opera.collect()
        } catch (e) { }
    }
}