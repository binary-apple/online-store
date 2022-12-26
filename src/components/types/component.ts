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

    public constructor(containerTag: string = 'div', ...className: Array<string>) {
        this.container = document.createElement(containerTag);
        this.container.classList.add(...className);
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