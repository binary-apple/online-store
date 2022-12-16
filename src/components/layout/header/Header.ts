class Header {
    init() {
        const event = new Event('render');

        return this.render(event);
    }

    render(event: Event) {
        return `
            <header>
                <input type="text">
                <button type="button">Поиск</button>
            </header>
            ${dispatchEvent(event) || ''}
        `;
    }
}

export default Header;
