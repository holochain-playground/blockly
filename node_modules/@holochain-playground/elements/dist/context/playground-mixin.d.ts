import { Constructor } from 'lit-element';
import { PlaygroundContext } from './context';
export interface IPlaygroundElement extends PlaygroundContext {
    updatePlayground(context: Partial<PlaygroundContext>): void;
    showMessage(message: string): void;
}
export declare const PlaygroundMixin: <T extends Constructor<HTMLElement>>(baseClass: T) => T & Constructor<IPlaygroundElement>;
