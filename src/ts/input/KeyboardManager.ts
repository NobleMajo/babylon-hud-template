export interface KeyboardEvents {
    [id: number]: {
        event: string,
        listener: () => void
    }
}

export interface ElementIdMap {
    [id: number]: HTMLElement
}

export class KeyboardManager {
    private lastId: number = 0
    private elementIdMap: ElementIdMap = {}

}