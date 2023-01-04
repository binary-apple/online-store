class MakeOrder {
    constructor() {}

    init() {
        const makeOrder = document.querySelector('.cart-board__btn');

        if (makeOrder) {
            makeOrder.addEventListener('click', () => {
                const event = new Event('open-order');

                dispatchEvent(event);
            });
        }
    }
}

export default MakeOrder;
