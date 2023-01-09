import { Cart } from "../cart";
import { Product } from "../types/product";

const product = {
    id: 1,
    stock: 10,
    price: 3,
    discountPercentage: 20,
    count: 0,
} as unknown as Product;

const cart = new Cart([]);

test('Add product to card', async () => {
    cart.addProductToCart(product, 1);

    const cartLength = cart.get().length;

    expect(cartLength).toBe(1);
});

test('Remove product from card', async () => {
    cart.removeProductFromCart(product.id);

    const cartLength = cart.get().length;

    expect(cartLength).toBe(0);
});

test('Increase product in cart', async () => {
    cart.addProductToCart(product, 1);
    const [productItem] = cart.get();

    cart.increaseProductCount(productItem);
    cart.increaseProductCount(productItem);
    cart.increaseProductCount(productItem);

    expect(cart.getTotalCount()).toBe(4);
});

test('decrease product in cart', async () => {
    cart.decreaseProductCount(product.id);
    cart.decreaseProductCount(product.id);
    cart.decreaseProductCount(product.id);

    expect(cart.getTotalCount()).toBe(1);
});

test('Doesn\'t work increase greater than stock', async () => {
    const [productItem] = cart.get();

    productItem.stock = 4;

    for (let i = 0; i < 15; i++) {
        cart.increaseProductCount(productItem);
    }


    expect(cart.getTotalCount()).toBe(4);
});
