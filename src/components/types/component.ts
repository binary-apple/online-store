import { Subscriber, Publisher } from "../../utils/observer-interface";

interface IComponent {
    render(): HTMLElement;
}

export type ComponentType = IComponent | (IComponent & Subscriber);

function isSubscriber(component: ComponentType): component is (IComponent & Subscriber) {
    return 'update' in component;
}

interface ComponentElementParams {
    containerTag: string;
    className?: Array<string>;
}

export abstract class Component implements IComponent {
    protected container: HTMLElement;

    public constructor(componentElementParams: ComponentElementParams = { containerTag: 'div' }) {
        this.container = document.createElement(componentElementParams.containerTag);
        if (componentElementParams.className) {
            this.container.classList.add(...componentElementParams.className);
        }
    }

    protected subscribe(...publishers: Array<Publisher>): void
    {
        if (publishers && publishers.length) {
            publishers.forEach((store) => isSubscriber(this) && store && store.attach(this));
        }
    }

    public render():HTMLElement {
        this.container.append(this.template());
        return this.container;
    }

    protected abstract template(): HTMLElement | DocumentFragment;
}