import { Awaitable } from './base'

export type EventListener<
    T extends EventEmitter,
    ARGS extends any[]
    > =
    (
        this: T,
        ...args: ARGS
    ) => Awaitable<void>

export type EventEmitterListener<
    ARGS extends any[]
    > =
    EventListener<EventEmitter, ARGS>

export interface EventEmitterEvents<T extends EventEmitter> {
    [key: string]:
    EventListener<T, any[]>[]
}

export class EventEmitter {
    events: EventEmitterEvents<this> = {}

    on<ARGS extends any[]>(
        event: string,
        listener: EventListener<this, ARGS>
    ): this {
        if (!Array.isArray(this.events[event])) {
            this.events[event] = []
        }
        this.events[event].push(listener as any)
        return this
    }

    removeListener<ARGS extends any[]>(
        event: string,
        listener: EventListener<this, ARGS>
    ): this {
        if (Array.isArray(this.events[event])) {
            this.events[event] = this.events[event].map((
                listener2
            ) => {
                if (listener2 === listener) {
                    return undefined
                }
                return listener2
            }).filter(
                (listener2) => typeof listener2 === "function"
            ) as any[]
            if (this.events[event].length === 0) {
                delete this.events[event]
            }
        }
        return this
    }


    emit(event: string, ...args: any[]): number {
        if (Array.isArray(this.events[event])) {
            let i: number = 0
            const listeners = this.events[event].slice()
            Promise.all(
                listeners.map(
                    (listener) => {
                        return listener.apply(this, args)
                    }
                )
            )
            return listeners.length
        }
        return 0
    }

    emitPromise(event: string, ...args: any[]): [number, Promise<void> | undefined] {
        if (Array.isArray(this.events[event])) {
            let i: number = 0
            const listeners = this.events[event].slice()

            return [
                listeners.length,
                Promise.all(
                    listeners.map(
                        (listener) => {
                            return listener.apply(this, args)
                        }
                    )
                ) as any as Promise<void>
            ]
        }
        return [0, undefined]
    }

    once<ARGS extends any[]>(
        event: string,
        listener: EventListener<this, ARGS>
    ): this {
        const tmpListener = (...args: ARGS) => {
            this.removeListener(event, tmpListener)
            listener.apply(this, args)
        }
        this.on(
            event,
            tmpListener
        )
        return this
    }
}


/*
EventEmitter.prototype.on = function (event, listener) {
    if (typeof this.events[event] !== 'object') {
        this.events[event] = [];
    }

    this.events[event].push(listener);
};

EventEmitter.prototype.removeListener = function (event, listener) {
    var idx;

    if (typeof this.events[event] === 'object') {
        idx = indexOf(this.events[event], listener);

        if (idx > -1) {
            this.events[event].splice(idx, 1);
        }
    }
};

EventEmitter.prototype.emit = function (event) {
    var i, listeners, length, args = [].slice.call(arguments, 1);

    if (typeof this.events[event] === 'object') {
        listeners = this.events[event].slice();
        length = listeners.length;

        for (i = 0; i < length; i++) {
            listeners[i].apply(this, args);
        }
    }
};

EventEmitter.prototype.once = function (event, listener) {
    this.on(event, function g() {
        this.removeListener(event, g);
        listener.apply(this, arguments);
    });
};
*/