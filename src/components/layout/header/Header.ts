class Header {
    init() {
        return this.render({});
    }

    render(content: object) {
        return `
            <header>
                Шапка
            </header>
        `
    }
}

export default Header;
