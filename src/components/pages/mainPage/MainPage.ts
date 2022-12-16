class MainPage {
    init() {
        return this.render();
    }

    render() {
        return `
            <ul>
                <li>
                    <a href="/cart">cart</a>
                </li>
                <li>
                    <a href="/product/1">product</a>
                </li>
                <li>
                    <a href="/product/2">product2</a>
                </li>
                <li>
                    <a href="/product/3">product3</a>
                </li>
            </ul>
        `;
    }
}

export default MainPage;
