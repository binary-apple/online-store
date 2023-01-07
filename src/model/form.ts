import { Store } from './store';
import { IFieldForm, ValidationObject } from './types/form';

class FormStore extends Store {
    form: ValidationObject;

    constructor(form: unknown) {
        super();

        this.form = form as ValidationObject;
    }

    public set(key: string, e: Event) {
        const inputTarget = e.target as HTMLInputElement;
        const { value } = inputTarget;
        const field = this.form[key] as IFieldForm;

        this.checkBackward(field, e);
        this.checkType(field, e);

        const [isValid, validValue] = this.validate(field, value);

        this.form[key].isValid = isValid;
        this.form[key].value = validValue;
        this.form[key].isDirty = true;

        this.notify();
    }

    checkBackward(field: IFieldForm, e: Event) {
        const inputEvent = e as InputEvent;

        const { inputType } = inputEvent;

        const hasMinLengthValidation = field.validation.minLength !== undefined || field.validation.minLength !== null;

        if (inputType === 'deleteContentBackward' && hasMinLengthValidation) {
            field.isBackward = true;
        } else if (inputType !== 'deleteContentBackward' && hasMinLengthValidation) {
            field.isBackward = false;
        }
    }

    checkType(field: IFieldForm, e: Event) {
        const inputEvent = e as InputEvent;

        const { data } = inputEvent;

        if (data) {
            if (field.validation.valueType !== 'any') {
                if (field.validation.valueType === 'string') {
                    const isString = data.match(/[A-Za-z]|-| /);

                    if (!isString) {
                        field.notType = true;
                    } else {
                        field.notType = false;
                    }
                }

                if (field.validation.valueType === 'number') {
                    const isNumber = data.match(/[0-9]/);

                    if (isNumber) {
                        field.notType = false;
                    } else {
                        field.notType = true;
                    }
                }
            }
        }
    }

    public get() {
        return this.form;
    }

    public validate(field: IFieldForm, value: string) {
        const validations = Object.entries(field.validation);
        let validValue = field.value ? field.value.trim() : '';

        let isValid = field.isValid;

        validations.forEach((item) => {
            const [name] = item;

            switch (name) {
                case 'required': {
                    if (!validValue) {
                        isValid = false;
                    } else {
                        isValid = true;
                    }

                    break;
                }
                case 'valueType': {
                    const [, type] = item;

                    if (type === 'string') {
                        validValue = this.lettersOnly(value);
                    } else if (type === 'number') {
                        validValue = this.numbersOnly(value);
                    } else {
                        validValue = value;
                    }

                    break;
                }
                case 'maxLength': {
                    validValue = this.maxLength(validValue, field.validation.maxLength as number);
                    break;
                }
                case 'minLength': {
                    const minLength = field.validation.minLength as number;

                    if (validValue.length < minLength) {
                        isValid = false;
                    } else {
                        isValid = true;
                    }
                    break;
                }
            }
        });

        return [isValid, validValue] as [boolean, string];
    }

    public isValid() {
        const isValid = Object.entries(this.form)
            .map((item) => item[1].isValid)
            .every((el) => el);

        return isValid;
    }

    private lettersOnly(value: string) {
        const isString = value.match(/[A-Za-z]|-| /g);

        let validValue;

        if (isString) {
            if (isString.length !== value.length) {
                validValue = value.slice(0, value.length - 1);
            } else {
                validValue = value;
            }
        } else {
            validValue = '';
        }

        return validValue;
    }

    private numbersOnly(value: string) {
        const isNumber = value.match(/[0-9]/g);

        let validValue = '';

        if (!isNumber || !value) {
            return '';
        }

        if (isNumber.length !== value.length) {
            validValue = value.slice(0, value.length - 1);
        } else {
            validValue = value;
        }

        return validValue;
    }

    private maxLength(value: string, maxLength: number) {
        let validValue = '';

        if (value.length > maxLength) {
            validValue = value.slice(0, maxLength);
        } else {
            validValue = value;
        }

        return validValue;
    }
}

export default FormStore;
