import { EventEmitter } from '../EventEmitter';

export type KeyboardEventType = "onkeydown" | "onkeypress" | "onkeyup"
export type MouseEventType = "onclick" | "oncontextmenu" | "ondblclick" | "onmousedown" | "onmouseenter" | "onmouseleave" | "onmousemove" | "onmouseout" | "onmouseover" | "onmouseup"

/*
mouse events
https://www.w3schools.com/jsref/obj_mouseevent.asp
*/

export declare interface InputManager {

}

export class InputManager extends EventEmitter {

}

export default InputManager