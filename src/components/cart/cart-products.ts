import { Component } from '../types/component';
import Checkbox from '../ui/checkbox';
import { Product } from '../../model/types/product';
import { Cart } from '../../model/cart';
import ProductTemplate from './component/product.html';
import Mustache from 'mustache';
import CartPlaceholder from './component/cartPlaceholder.html';

class CartProducts extends Component {
    cart: Cart;

    constructor(cart: Cart) {
        super({ containerTag: 'div', className: ['cart-products'] });

        this.cart = cart;

        this.subscribe(this.cart);
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.getTemplate();

        return main.content;
    }

    public productLinkClickHandler(callback: (e: Event) => void) {
        const wrapper = document.querySelector('.cart-products');

        if (wrapper) {
            wrapper.addEventListener('click', (e) => {
                callback(e);
            });
        }
    }

    public changeQuntityProductInCart(callback: (e: Event, type: string, productId: number) => void) {
        const wrapper = document.querySelector('.cart-products');

        if (wrapper) {
            wrapper.addEventListener('click', (e: Event) => {
                const htmlTarget = e.target as HTMLElement;

                const isIncrease = htmlTarget.classList.contains('cart-quanity__btn--plus');
                const isDecrease = htmlTarget.classList.contains('cart-quanity__btn--minus');

                const productWrapper = htmlTarget.closest('.cart-item') as HTMLElement;

                if (productWrapper) {
                    const checkbox = productWrapper.querySelector('.checkbox-fake__input') as HTMLInputElement;

                    if (checkbox) {
                        const productId = +checkbox.value;

                        if (isIncrease) {
                            callback(e, 'increase', productId);
                        } else if (isDecrease) {
                            callback(e, 'decrease', productId);
                        }
                    }
                }
            });
        }
    }

    private getProductTemplate(item: Product) {
        const checkboxProduct = new Checkbox({
            id: `product-${item.id}`,
            value: item.id,
        }).getTemplate();

        return Mustache.render(ProductTemplate, {
            checkbox: checkboxProduct,
            order: item.order,
            title: item.title,
            description: item.description,
            price: item.price,
            stock: item.stock,
            count: item.count,
            totalPrice: (item.count ? item.count : 0) * item.price,
            image: item.images[0],
            id: item.id,
        });
    }

    public getTemplate() {
        const products = this.cart.getProductsWithPagination() as Array<Product>;

        if (products.length) {
            const productTemplate = this.getProductTemplate.bind(this);

            return products.map(productTemplate).join('');
        }

        return Mustache.render(CartPlaceholder, {});
    }

    public update() {
        const productsWrapper = document.querySelector('.cart-products');

        if (productsWrapper) {
            productsWrapper.innerHTML = '';

            const products = this.cart.get();

            if (!products.length) {
                productsWrapper.innerHTML = Mustache.render(CartPlaceholder, {});
            } else {
                productsWrapper.innerHTML = this.getTemplate();
            }
        }
    }
}

export default CartProducts;
