import { Component } from '../types/component';
import Mustache from 'mustache';
import Content from './component/content.html';
import { Product } from '../../model/types/product';
import { Cart } from '../../model/cart';
import Rating from './component/rating.html';

class ProductContent extends Component {
    product: Product;
    cart: Cart;

    constructor(product: Product, cart: Cart) {
        super({ containerTag: 'main', className: ['main-container'] });

        this.product = product;
        this.cart = cart;
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.getTemplate();

        return main.content;
    }

    public getTemplate() {
        const name = this.product.title;
        const rating = this.getRatingTemplate();

        return Mustache.render(Content, { name, rating });
    }

    getRatingTemplate() {
        const rating = this.product.rating;

        const [first, second] = ('' + rating).split('.');

        const firstRound = +second > 70 ? +first + 1 : first;
        const secondRound = +second < 30 ? 0 : +second > 30 && +second < 70 ? 5 : +second > 70 ? 0 : '';

        const roundedRating = parseFloat(firstRound + '.' + secondRound);

        const calculateRatingClass = this.calculateRatingClass.bind(this, roundedRating);

        return Array.from(new Array(5)).map(calculateRatingClass);
    }

    calculateRatingClass(rating: number, item: number, index: number) {
        let ratingClass;
        const counter = index + 1;

        if (counter < rating) {
            ratingClass = 'product-rating__item--full';
        } else if (counter > rating && counter === Math.ceil(rating)) {
            ratingClass = 'product-rating__item--semi';
        } else {
            ratingClass = 'product-rating__item--empty';
        }

        return Mustache.render(Rating, { ratingClass });
    }

    public update() {
        console.log('update');
    }
}

export default ProductContent;
