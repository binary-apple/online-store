class Header {
    init() {
        return this.render();
    }

    render() {
        return `
            <header>
                <input type="text">
                <button type="button">Поиск</button>
            </header>
        `;
    }
}

export default Header;
