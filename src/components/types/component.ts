import { Subscriber, Publisher } from "../../utils/observer-interface";

interface IComponent {
    render(): HTMLElement;
}

export type ComponentType = IComponent | (IComponent & Subscriber);

function isSubscriber(component: ComponentType) {
    return (<Subscriber>component).update !== undefined;
}

export abstract class Component implements IComponent {
    protected container: HTMLElement;
    protected containerTag = 'div';
    protected className: null | string = null;

    public constructor() {
        this.container = document.createElement(this.containerTag);
        if (this.className) {
            this.container.classList.add(this.className);
        }
    }

    protected observer(...publishers: Array<Publisher>): void
    {
        if (publishers && publishers.length) {
            return;
        }
        publishers.forEach((store) => isSubscriber(this) && store && store.attach(this as unknown as Subscriber));
    }

    public render():HTMLElement{
        this.container.append(this.template());
        return this.container;
    }

    protected abstract template(): HTMLElement|DocumentFragment;
}