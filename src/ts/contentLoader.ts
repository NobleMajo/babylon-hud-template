
export type ContentType<T> = [string, T, boolean, Promise<void>]

export interface ContentLoaderContents {
    img: {
        [key: string]: ContentType<HTMLImageElement>
    },
    svg: {
        [key: string]: ContentType<SVGElement>
    },
    vid: {
        [key: string]: ContentType<HTMLVideoElement>
    },
    aud: {
        [key: string]: ContentType<HTMLAudioElement>
    }
}

export type PrepareImageFunction = (
    img: HTMLImageElement,
    src: string,
) => void

export class ContentLoader {
    contents: ContentLoaderContents = {
        img: {},
        svg: {},
        vid: {},
        aud: {},
    }

    async loadImg(
        src: string,
        prepareFunc?: PrepareImageFunction,
    ): Promise<HTMLImageElement> {
        if (this.contents.img[src]) {
            if (
                this.contents.img[src][2]
                !== true
            ) {
                await this.contents.img[src][3]
            }
            const imgElement: HTMLImageElement = document.createElement("img")
            imgElement.setAttribute("src", src)
            prepareFunc && prepareFunc(imgElement, src)
            return imgElement
        }
        const image: HTMLImageElement = new Image()
        image.src = src

        const p = new Promise<void>((res, rej) => {
            image.onload = () => res()
            image.onerror = (err) => rej(err)
        })
        this.contents.img[src] = [
            src,
            image,
            false,
            p
        ]
        await p
        this.contents.img[src][2] = true
        prepareFunc && prepareFunc(
            this.contents.img[src][1],
            src
        )
        return this.contents.img[src][1]
    }
}

export const mainContentLoader: ContentLoader = new ContentLoader()
export default mainContentLoader