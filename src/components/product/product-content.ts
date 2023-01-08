import { Component } from '../types/component';
const Content = require('./component/content.html');
import { Product } from '../../model/types/product';
import { Cart } from '../../model/cart';
const Rating = require('./component/rating.html');
const Image = require('./component/image.html');
import { products } from '../../model/productItems';
import Preloader from '../../assets/img/preloader.svg?inline';
import { Modal } from 'bootstrap';

class ProductContent extends Component {
    product: Product;
    cart: Cart;
    products: Array<Product>;
    cartText = '';
    btnToCartDisabled = '';
    orderModal: Modal = {} as Modal;

    constructor(product: Product, cart: Cart) {
        super({ containerTag: 'main', className: ['main-container'] });

        this.product = product;
        this.cart = cart;
        this.products = products as unknown as Array<Product>;

        this.subscribe(this.cart);
    }

    public addProdcutToCard(callback: (product: Product, type: string) => void) {
        const btn = document.querySelector('.product__to-cart');

        if (btn) {
            btn.addEventListener('click', () => {
                const inCart = this.productInCart();

                callback(this.product, inCart ? 'remove' : 'add');
            });
        }
    }

    public zoomImage() {
        const wrapper = document.querySelector('.product-info__images');

        if (wrapper) {
            wrapper.addEventListener('click', async (e: Event) => {
                const htmlTarget = e.target as HTMLElement;

                const isImage =
                    htmlTarget.classList.contains('product-images-item__img') ||
                    htmlTarget.classList.contains('product-images-main__image');

                if (isImage) {
                    const wrapperPhoto = document.createElement('div');
                    wrapperPhoto.innerHTML = Preloader;

                    wrapperPhoto.classList.add('preloader__bg');

                    const img = document.createElement('img');
                    img.classList.add('product-photo__img');

                    const src = htmlTarget.getAttribute('src');

                    if (src) {
                        img.setAttribute('src', src);
                        document.body.append(wrapperPhoto);

                        setTimeout(() => {
                            wrapperPhoto.classList.add('show');
                        });

                        const loadImg = new Promise((res) => {
                            img.onload = () => {
                                res(true);
                            };
                        });

                        await loadImg;

                        wrapperPhoto.innerHTML = '';

                        wrapperPhoto.append(img);

                        wrapperPhoto.addEventListener('click', (event) => {
                            const htmlTarget = event.target as HTMLElement;

                            const isBg = htmlTarget.classList.contains('preloader__bg');

                            if (isBg) {
                                htmlTarget.remove();
                            }

                            const isPic = htmlTarget.closest('.preloader__bg');

                            if (isPic) {
                                isPic.remove();
                            }
                        });
                    }
                }
            });
        }
    }

    public makeOrder(callback: (product: Product) => void) {
        const orderBtn = document.querySelector('.product-info__order-btn');

        if (orderBtn) {
            orderBtn.addEventListener('click', () => {
                callback(this.product);
            });
        }
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.getTemplate();

        return main.content;
    }

    public getTemplate() {
        const name = this.product.title;
        const rating = this.getRatingTemplate();
        const image = this.getImageTemplate();

        const mainImage = this.product.images[Math.floor(Math.random() * this.product.images.length)];
        const price = this.product.price;
        const discount = this.product.discountPercentage;
        const description = this.product.description;
        const stock = this.product.stock;
        const category = this.product.category.toLowerCase().trim();
        const brand = this.product.brand.toLowerCase().trim();

        this.cartText = this.getCartBtnText();

        return Content({
            name,
            rating,
            image,
            mainImage,
            price,
            discount,
            description,
            stock,
            category,
            brand,
            cartText: this.cartText,
        });
    }

    productInCart() {
        return !!this.cart.get().find((el) => el.id === this.product.id);
    }

    getCartBtnText() {
        const inCart = this.productInCart();
        return inCart ? 'REMOVE FROM CART' : 'TO CART';
    }

    private getRatingTemplate() {
        const rating = this.product.rating;

        const [first, second] = ('' + rating).split('.');

        const firstRound = +second > 70 ? +first + 1 : first;
        const secondRound = +second < 30 ? 0 : +second > 30 && +second < 70 ? 5 : +second > 70 ? 0 : '';

        const roundedRating = parseFloat(firstRound + '.' + secondRound);

        const calculateRatingClass = this.calculateRatingClass.bind(this, roundedRating);

        return Array.from(new Array(5)).map(calculateRatingClass).join('');
    }

    private getImageTemplate() {
        return this.product.images
            .map((item: string) => {
                const image = item;

                return Image({ image });
            })
            .join('');
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

        return Rating({ ratingClass });
    }

    public update() {
        const btn = document.querySelector('.product__to-cart') as HTMLElement;

        if (btn) {
            btn.innerText = this.getCartBtnText();
        }

        const hasModal = Object.keys(this.orderModal).length;

        if (this.cart.openModalPage) {
            if (!hasModal) {
                const modal = document.querySelector('.order-modal');

                if (modal) {
                    this.orderModal = new Modal(modal);

                    this.orderModal.show();
                }
            }
        }
    }
}

export default ProductContent;
