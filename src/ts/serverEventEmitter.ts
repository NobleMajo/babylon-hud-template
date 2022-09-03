
export class ServerEventEmitter {


    constructor(
        public readonly ws: WebSocket
    ) {

    }


}

export interface ProtocolCharCodes {
    [key: string]: number,
}

export interface ProtocolListeners {
    [key: number]: ProtocolListener,
}

export type ProtocolListener = (bin: ArrayBuffer) => void

export type SendFunc = (bin: ArrayBuffer | string) => void

export class MajoWebSocket {
    public readonly socket: WebSocket

    private lastCharCode: number = 0

    private readonly protocolCharCodes: ProtocolCharCodes = {}
    private readonly protocolListeners: ProtocolListeners = {}

    constructor(
        url: string
    ) {
        this.socket = new WebSocket(url)
        this.socket.binaryType = "arraybuffer"
    }

    defineProtocol(
        shortname: string,
        listener: ProtocolListener
    ): void {
        if (this.protocolCharCodes[shortname]) {
            throw new Error("Protocol shortname '" + shortname + "' already in use!")
        }
        const code: number = this.lastCharCode++
        this.protocolCharCodes[shortname] = code
        this.protocolListeners[code] = listener
    }

    createProtocolSendFunction(shortname: string): SendFunc {
        const code = this.protocolCharCodes[shortname]
        return (bin) => this.socket.send(String.fromCharCode(code) + bin)
    }

    async message(
        msg: string,
    ): Promise<void> {

    }

    async sendProto(

        raw: string
    ): Promise<void> {

    }

    async request(): Promise<string> {
        return ""
    }
}