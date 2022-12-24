import { Subscriber, Publisher } from './types/observer-interface';

export class Store implements Publisher {
    private subscribers: Array<Subscriber> = [];

    attach(subscriber: Subscriber) {
        if (!this.subscribers.find((el) => el === subscriber)) {
            this.subscribers.push(subscriber);
        }
    }

    detach(subscriber: Subscriber) {
        const subscriberId = this.subscribers.indexOf(subscriber);
        if (subscriberId >= 0) {
            this.subscribers.splice(subscriberId, 1);
        } else {
            throw new Error('You are trying to remove not existing subscriber');
        }
    }

    notify() {
        this.subscribers.forEach((el) => el.update(this));
    }
}
