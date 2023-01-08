import { Component } from '../types/component';
import CartProducts from './cart-products';
import CartTotalBoard from './cart-total-board';
import { Product } from '../../model/types/product';
import { Cart } from '../../model/cart';
import CartNavigation from './cart-navigation';
import OrderModal from '../markup/orderModal.html';
import { Modal } from 'bootstrap';
import FormStore from '../../model/form';
import { ValidationError } from '../types/validation-error';
import { IFieldForm } from '../../model/types/form';

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
    orderEvents = [] as Array<number>;

    constructor(cart: Cart) {
        super({ containerTag: 'section', className: ['cart-content'] });

        this.cart = cart;
        this.cartProducts = new CartProducts(this.cart);
        this.cartTotal = new CartTotalBoard(this.cart);
        this.cartNavigation = new CartNavigation(this.cart);

        this.order = {
            firstname: {
                value: '',
                validation: {
                    required: true,
                    valueType: 'string',
                },
                isValid: false,
                isDirty: false,
            },
            lastname: {
                value: '',
                validation: {
                    required: true,
                    valueType: 'string',
                },
                isValid: false,
                isDirty: false,
            },
            address: {
                value: '',
                validation: {
                    required: true,
                    valueType: 'any',
                    minLength: 5,
                },
                isValid: false,
                isDirty: false,
            },
            card: {
                value: '',
                validation: {
                    required: true,
                    valueType: 'number',
                    maxLength: 16,
                },
                isValid: false,
                isDirty: false,
            },
        };

        this.form = new FormStore(this.order);

        this.subscribe(this.cart);
        this.subscribe(this.form);
    }

    public makeOrder(callback: (products: Array<Product>) => void) {
        const modalOrder = document.querySelector('.order-modal');

        if (modalOrder) {
            const modal = new Modal(modalOrder);

            modal.show();

            const makeOrderBtn = document.querySelector('.cart-order-modal__confirm');

            if (makeOrderBtn) {
                if (this.orderEvents.length === 0) {
                    this.orderEvents.push(1);

                    makeOrderBtn.addEventListener('click', () => {
                        callback(this.cart.getOrder());

                        modal.hide();
                    });
                }
            }
        }
    }

    public setPersonInfo() {
        const firstName = document.querySelector('.order-firstname__value');

        if (firstName) {
            firstName.addEventListener('input', (e) => {
                this.form.set('firstname', e);
            });
        }

        const lastName = document.querySelector('.order-lastname__value');

        if (lastName) {
            lastName.addEventListener('input', (e) => {
                this.form.set('lastname', e);
            });
        }

        const address = document.querySelector('.order-address__value');

        if (address) {
            address.addEventListener('input', (e: Event) => {
                this.form.set('address', e);
            });
        }

        const cardNumber = document.querySelector('.order-cart-number__value');

        if (cardNumber) {
            cardNumber.addEventListener('input', (e: Event) => {
                this.form.set('card', e);
            });
        }
    }

    public orderFromClickToButton(callback: (products: Array<Product>) => void) {
        const orderButton = document.querySelector('.cart-board__btn');

        if (orderButton) {
            this.cart.emptyOrderArray();

            this.cart.get().forEach((item) => {
                this.cart.addToOrder(item);
            });

            const cb = callback.bind(this, this.cart.getOrder());

            const makeOrder = this.makeOrder.bind(this, cb);
            orderButton.addEventListener('click', makeOrder);
        }
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

        return contentTemplate({ counter, contentIsHide, products, total, navigation });
    }

    private cartCounter() {
        const counter = this.cart.getTotalCount();
        const cartNoEmpty = counter !== 0;

        return cartNoEmpty ? counterTemplate({ counter }) : '';
    }

    checkValidateError(errorObj: ValidationError) {
        const { input, fieldname, field, checkname } = errorObj;

        const parent = input.parentNode as HTMLElement;

        if (parent) {
            checkname.forEach((item) => {
                if (item === 'valueType') {
                    this.fieldNotType(field, parent, fieldname);
                } else if (item === 'required') {
                    this.isRequired(field, parent, fieldname);
                }
            });
        }
    }

    fieldNotType(field: IFieldForm, parent: HTMLElement, fieldname: string) {
        const validateError = document.createElement('p');
        validateError.classList.add('validate-error');

        const error = parent.querySelector('.validate-error');

        if (field.notType) {
            validateError.innerText = `${fieldname} is ${field.validation.valueType} type`;

            if (!error) {
                parent.append(validateError);
            } else {
                error.remove();
                parent.append(validateError);
            }
        }
    }

    isRequired(field: IFieldForm, parent: HTMLElement, fieldname: string) {
        const validateError = document.createElement('p');
        validateError.classList.add('validate-error');

        const error = parent.querySelector('.validate-error');

        if (!field.value.length) {
            validateError.innerText = `${fieldname} is required`;

            if (error) {
                //     error.remove();
                //     parent.append(validateError);
            } else {
                //     parent.append(validateError);
            }
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

        const firstName = document.querySelector('.order-firstname__value') as HTMLInputElement;

        if (firstName) {
            firstName.value = order.firstname.value as string;

            if (order.firstname.isDirty) {
                const errorObj = {
                    input: firstName,
                    fieldname: 'Firstname',
                    field: order.firstname,
                    checkname: Object.keys(order.firstname.validation),
                };

                this.checkValidateError(errorObj);
            }
        }

        const lastName = document.querySelector('.order-lastname__value') as HTMLInputElement;

        if (lastName) {
            lastName.value = order.lastname.value as string;

            if (order.lastname.isDirty) {
                const errorObj = {
                    input: lastName,
                    fieldname: 'Lastname',
                    field: order.lastname,
                    checkname: Object.keys(order.lastname.validation),
                };

                this.checkValidateError(errorObj);
            }
        }

        const address = document.querySelector('.order-address__value') as HTMLInputElement;

        if (address) {
            address.value = order.address.value as string;

            if (order.address.isDirty) {
                const errorObj = {
                    input: address,
                    fieldname: 'Address',
                    field: order.address,
                    checkname: Object.keys(order.address.validation),
                };

                this.checkValidateError(errorObj);
            }
        }

        const cardNumber = document.querySelector('.order-cart-number__value') as HTMLInputElement;

        if (cardNumber) {
            cardNumber.value = order.card.value as string;

            if (order.card.isDirty) {
                const errorObj = {
                    input: cardNumber,
                    fieldname: 'Card',
                    field: order.card,
                    checkname: Object.keys(order.address.validation),
                };

                this.checkValidateError(errorObj);
            }
        }

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
