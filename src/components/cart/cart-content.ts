import { Component } from '../types/component';
import CartProducts from './cart-products';
import CartTotalBoard from './cart-total-board';
import { Product } from '../../model/types/product';
import { Cart } from '../../model/cart';
import CartNavigation from './cart-navigation';
const OrderModal = require('../markup/orderModal.html');
import { Modal } from 'bootstrap';
import FormStore from '../../model/form';
import masterCard from '../../assets/img/mastercard.svg';
import visa from '../../assets/img/visa.svg';
import bitcoin from '../../assets/img/bitcoin.svg';

const counterTemplate = require('./component/counter.html');
const contentTemplate = require('./component/content.html');

class CartContent extends Component {
    cart: Cart;
    cartProducts: CartProducts;
    cartTotal: CartTotalBoard;
    products: Array<Product> = [];
    cartNavigation: CartNavigation;
    form: FormStore;
    order: unknown;
    orderEvents = false;
    openModalOrder = false;
    modals = [] as Array<Modal>;

    constructor(cart: Cart) {
        super({ containerTag: 'section', className: ['cart-content'] });

        this.cart = cart;
        this.cartProducts = new CartProducts(this.cart);
        this.cartTotal = new CartTotalBoard(this.cart);
        this.cartNavigation = new CartNavigation(this.cart);

        this.order = {
            name: {
                value: '',
                validation: {
                    required: true,
                    valueType: 'name',
                    wordCount: 2,
                    wordLength: 3,
                },
                isValid: false,
                isDirty: false,
                isBackward: false,
            },
            phone: {
                value: '',
                validation: {
                    required: true,
                    valueType: 'phone',
                    minLength: 10,
                },
                isValid: false,
                isDirty: false,
                isBackward: false,
            },
            address: {
                value: '',
                validation: {
                    required: true,
                    valueType: 'address',
                    wordCount: 3,
                    wordLength: 5,
                },
                isValid: false,
                isDirty: false,
                isBackward: false,
            },
            email: {
                value: '',
                validation: {
                    required: true,
                    valueType: 'email',
                },
                isValid: false,
                isDirty: false,
                isBackward: false,
            },
            card: {
                value: '',
                validation: {
                    required: true,
                    valueType: 'number',
                    length: 16,
                },
                isValid: false,
                isDirty: false,
                isBackward: false,
            },
            cardDate: {
                value: '',
                validation: {
                    required: true,
                    valueType: 'cardDate',
                },
                isValid: false,
                isDirty: false,
                isBackward: false,
            },
            cvv: {
                value: '',
                validation: {
                    required: true,
                    valueType: 'number',
                    length: 3,
                },
                isValid: false,
                isDirty: false,
                isBackward: false,
            },
        };

        this.form = new FormStore(this.order);

        this.subscribe(this.cart);
        this.subscribe(this.form);
    }

    public makeOrder(callback: (products: Array<Product>) => void, redirect: () => void, auto = false) {
        const modalOrder = document.querySelector('.order-modal');

        if (modalOrder) {
            if (!this.modals.length) {
                const modal = new Modal(modalOrder);
                this.modals.push(modal);
            }

            if (auto) {
                this.modals[0].show();
            }

            const orderModalOpen = document.querySelector('.cart-board__btn');

            if (orderModalOpen && !this.openModalOrder) {
                this.openModalOrder = true;

                orderModalOpen.addEventListener('click', () => {
                    this.modals[0].show();
                });

                const makeOrderBtn = document.querySelector('.cart-order-modal__confirm');

                if (makeOrderBtn) {
                    makeOrderBtn.addEventListener('click', () => {
                        const order = [...this.cart.get()];
                        this.cart.emptyOrderArray();

                        this.modals[0].hide();
                        const success = document.querySelector('.modal-order-success');

                        if (success) {
                            const successModal = new Modal(success);

                            successModal.show();

                            setTimeout(() => {
                                successModal.hide();
                            }, 3000);

                            success.addEventListener('hidden.bs.modal', () => {
                                callback(order);
                                redirect();
                            });
                        }
                    });
                }

                if (this.modals[0]) {
                    modalOrder.addEventListener('hidden.bs.modal', () => {
                        this.form.reset();
                    });
                }
            }
        }
    }

    public setPersonInfo() {
        if (!this.orderEvents) {
            this.orderEvents = true;

            this.getOrderInputs().forEach((item) => {
                if (item.input) {
                    item.input.addEventListener('input', (e) => {
                        this.form.set(item.name, e);
                    });
                }
            });
        }
    }

    private getOrderInputs() {
        const name = document.querySelector('.order-name__value') as HTMLInputElement;
        const phone = document.querySelector('.order-phone__value') as HTMLInputElement;
        const email = document.querySelector('.order-email__value') as HTMLInputElement;
        const cvv = document.querySelector('.order-cvv__value') as HTMLInputElement;
        const cardDate = document.querySelector('.order-cardDate__value') as HTMLInputElement;
        const address = document.querySelector('.order-address__value') as HTMLInputElement;
        const cardNumber = document.querySelector('.order-card__value') as HTMLInputElement;

        const orderInputs = [
            {
                name: 'name',
                input: name,
            },
            {
                name: 'phone',
                input: phone,
            },
            {
                name: 'address',
                input: address,
            },
            {
                name: 'email',
                input: email,
            },
            {
                name: 'cvv',
                input: cvv,
            },
            {
                name: 'cardDate',
                input: cardDate,
            },
            {
                name: 'card',
                input: cardNumber,
            },
        ];

        return orderInputs;
    }

    protected template() {
        const main = document.createElement('template');

        main.innerHTML = this.getTemplate();

        return main.content;
    }

    public getTemplate() {
        const counter = this.cartCounter();
        const products = this.cartProducts.getTemplate();
        const total = this.cartTotal.getTemplate();
        const navigation = this.cartNavigation.getTemplate();
        const contentIsHide = this.cart.getTotalCount() === 0 ? 'hide' : '';
        const orderMakeModal = OrderModal(this.order);

        return contentTemplate({ counter, contentIsHide, products, total, navigation, orderMakeModal });
    }

    private cartCounter() {
        const counter = this.cart.getTotalCount();
        const cartNoEmpty = counter !== 0;

        return cartNoEmpty ? counterTemplate({ counter }) : '';
    }

    private addIcon(img: HTMLElement) {
        const iconPay = document.querySelector('.order-card__icon');

        if (iconPay) {
            img.onload = () => {
                iconPay.innerHTML = '';
                iconPay.append(img);
            };
        }
    }

    public handleClickToCartIcon(callback: (e: Event) => void) {
        const cart = document.querySelector('.cart');
        if (cart) {
            cart.addEventListener('click', function (e) {
                e.preventDefault();
                callback(e);
            });
        }
    }

    public handleClickToLogoIcon(callback: (e: Event) => void) {
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', function (e) {
                e.preventDefault();
                callback(e);
            });
        }
    }

    public update() {
        const counter = document.querySelector('.cart-title__cart-counter');

        if (counter) {
            counter.remove();
            const title = document.querySelector('.cart-content__title');

            if (title) {
                title.insertAdjacentHTML('beforeend', this.cartCounter());
            }
        }
        const order = this.form.get();

        const orderInputs = this.getOrderInputs();

        const img = document.createElement('img');

        if (order.card.value.startsWith('4')) {
            img.setAttribute('src', visa);
        } else if (order.card.value.startsWith('5')) {
            img.setAttribute('src', masterCard);
        } else {
            img.setAttribute('src', bitcoin);
        }

        this.addIcon(img);

        orderInputs.forEach((item) => {
            if (item.input) {
                item.input.value = order[item.name].value as string;

                const hasErrors = order[item.name].errors?.length;

                if (hasErrors) {
                    const errorTemp = item.input.parentNode?.querySelector('.validate-error');

                    if (errorTemp) {
                        errorTemp.remove();
                    }

                    const error = document.createElement('p');
                    error.classList.add('validate-error');
                    error.innerText = (order[item.name].errors as Array<string>)[0] as string;

                    item.input.parentNode?.append(error);
                } else {
                    item.input.parentNode?.querySelector('.validate-error')?.remove();
                }
            }
        });

        const makeOrderBtn = document.querySelector('.cart-order-modal__confirm');

        if (makeOrderBtn) {
            if (this.form.isValid()) {
                makeOrderBtn.removeAttribute('disabled');
            } else {
                makeOrderBtn.setAttribute('disabled', '');
            }
        }
    }
}

export default CartContent;
