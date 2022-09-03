
export const hudHelperId = "hudHelper"
export const hudHelper = document.getElementById(hudHelperId) as HTMLDivElement
if (!hudHelper) {
    throw new Error("Can't find the hud helper with id '" + hudHelperId + "'")
}

export const mainHudId = "mainHud"
export const mainHud = document.getElementById(mainHudId) as HTMLDivElement
if (!mainHud) {
    throw new Error("Can't find the main hud with id '" + mainHudId + "'")
}

export interface HudElements {
    tl: HTMLDivElement;
    tc: HTMLDivElement;
    tr: HTMLDivElement;
    cl: HTMLDivElement;
    cc: HTMLDivElement;
    cr: HTMLDivElement;
    bl: HTMLDivElement;
    bc: HTMLDivElement;
    br: HTMLDivElement;
}

export const hud: HudElements = {
    tl: document.getElementById("tlHud") as HTMLDivElement,
    tc: document.getElementById("tcHud") as HTMLDivElement,
    tr: document.getElementById("trHud") as HTMLDivElement,
    cl: document.getElementById("clHud") as HTMLDivElement,
    cc: document.getElementById("ccHud") as HTMLDivElement,
    cr: document.getElementById("crHud") as HTMLDivElement,
    bl: document.getElementById("blHud") as HTMLDivElement,
    bc: document.getElementById("bcHud") as HTMLDivElement,
    br: document.getElementById("brHud") as HTMLDivElement,
}

for (const hudId of Object.keys(hud) as (keyof HudElements)[]) {
    if (!hud[hudId]) {
        throw new Error("Cant find hud element with id '" + hudId + "'")
    }
}

export type HudValue = HTMLElement | HTMLElement[] | undefined

export interface HudDesign {
    tl: HudValue,
    tc: HudValue,
    tr: HudValue,
    cl: HudValue,
    cc: HudValue,
    cr: HudValue,
    bl: HudValue,
    bc: HudValue,
    br: HudValue,
}

export function setHudDesign(
    design: HudDesign,
    clearLast: boolean = true,
): void {
    setHudElements(hud.tl, design.tl, clearLast)
    setHudElements(hud.tc, design.tc, clearLast)
    setHudElements(hud.tr, design.tr, clearLast)
    setHudElements(hud.cl, design.cl, clearLast)
    setHudElements(hud.cc, design.cc, clearLast)
    setHudElements(hud.cr, design.cr, clearLast)
    setHudElements(hud.bl, design.bl, clearLast)
    setHudElements(hud.bc, design.bc, clearLast)
    setHudElements(hud.br, design.br, clearLast)
}

export function setHudElements(
    hudDev: HTMLDivElement,
    hudValue: HudValue,
    clearLast: boolean = true,
): void {
    if (clearLast) {
        hudDev.innerHTML = ""
    }
    if (hudValue) {
        if (Array.isArray(hudValue)) {
            for (const child of hudValue) {
                hud.tl.appendChild(child)
            }
        } else {
            hud.tl.appendChild(hudValue)
        }
    }
}

export function disableHudHelper(): void {
    hudHelper.style.display = "none"
}

export function enableHudHelper(): void {
    hudHelper.style.display = "block"
}

export function isHudHelperEnabled(): boolean {
    return hudHelper.style.display !== "none"
}