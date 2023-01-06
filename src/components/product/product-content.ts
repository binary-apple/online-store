import { Component } from '../types/component';
import Mustache from 'mustache';
import Content from './component/content.html';
import { Product } from '../../model/types/product';
import { Cart } from '../../model/cart';
import Rating from './component/rating.html';
import Image from './component/image.html';
import { products } from '../../model/productItems';
import Preloader from '../../assets/img/preloader.svg?inline';

class ProductContent extends Component {
    product: Product;
    cart: Cart;
    products: Array<Product>;
    cartText = '';
    btnToCartDisabled = '';

    constructor(product: Product, cart: Cart) {
        super({ containerTag: 'main', className: ['main-container'] });

        this.product = product;
        this.cart = cart;
        this.products = products as unknown as Array<Product>;

        this.subscribe(this.cart);
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.getTemplate();

        return main.content;
    }

    public getTemplate() {
        return '';
    }
}

export default ProductContent;
