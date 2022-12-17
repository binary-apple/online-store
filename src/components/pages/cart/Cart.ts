class Cart {
    async init() {
        return this.render();
    }

    render() {
        return `
            <a href="/">main</a>
            Количество продуктов: ;
            <a href="/cart">stand</a>        
        `;
    }
}

export default Cart;
