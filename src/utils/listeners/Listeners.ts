class Listeners {
    listeners = [] as Array<string>;

    onceListener(event: string, handler: () => void) {
        if (!this.listeners.includes(event)) {
            this.listeners.push(event);
            window.addEventListener(event, handler);
        }
    }
}

export default Listeners;
