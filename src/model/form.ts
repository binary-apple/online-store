import { Store } from './store';
import { IFieldForm, ValidationObject } from './types/form';

class FormStore extends Store {
    form: ValidationObject;

    constructor(form: unknown) {
        super();

        this.form = Object.fromEntries(
            Object.entries(form as ValidationObject).map((item) => {
                item[1].errors = [];

                return item;
            })
        );
    }

    public reset() {
        for (const key in this.form) {
            this.form[key].value = '';
        }

        this.notify();
    }

    public set(key: string, e: Event) {
        const inputEvent = e as unknown as InputEvent;
        const inputTarget = e.target as HTMLInputElement;
        const { value } = inputTarget;
        const field = this.form[key] as IFieldForm;

        this.checkBackward(field, e);
        this.checkType(field, e);

        const [isValid, validValue] = this.validate(field, value, inputEvent);

        this.form[key].isValid = isValid;
        this.form[key].value = validValue;
        this.form[key].isDirty = true;

        this.notify();
    }

    public checkBackward(field: IFieldForm, e: Event) {
        const inputEvent = e as InputEvent;

        const { inputType } = inputEvent;

        const hasMinLengthValidation = field.validation.minLength !== undefined || field.validation.minLength !== null;

        if (inputType === 'deleteContentBackward' && hasMinLengthValidation) {
            field.isBackward = true;
        } else if (inputType !== 'deleteContentBackward' && hasMinLengthValidation) {
            field.isBackward = false;
        }
    }

    public checkType(field: IFieldForm, e: Event) {
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

    public validate(field: IFieldForm, value: string, e: InputEvent) {
        const validations = Object.entries(field.validation);
        let validValue = value;

        let isValid = field.isValid;

        validations.forEach((item) => {
            const [name] = item;

            switch (name) {
                case 'required': {
                    const index = field.errors?.indexOf('Field is required') as number;
                    field.value = value;

                    if (!field.value) {
                        isValid = false;

                        if (index === -1) {
                            field.errors?.push('Field is required');
                        }
                    } else {
                        isValid = true;
                        (field.errors as Array<string>).length = 0;
                    }

                    break;
                }
                case 'valueType': {
                    const [, type] = item;

                    if (type === 'string') {
                        const [valueField, validFlag] = this.lettersOnly(validValue, field, e);
                        validValue = valueField as string;
                        isValid = validFlag as boolean;
                    } else if (type === 'number') {
                        const [valueField, validFlag] = this.numbersOnly(validValue, field, e);
                        validValue = valueField as string;
                        isValid = validFlag as boolean;
                    } else if (type === 'name') {
                        const [valueField, validFlag] = this.separateString(validValue, field, e);

                        validValue = valueField as string;
                        isValid = validFlag as boolean;
                    } else if (type === 'cardDate') {
                        const [valueField, validFlag] = this.cardDate(validValue, field, e);

                        validValue = valueField as string;
                        isValid = validFlag as boolean;
                    } else if (type === 'phone') {
                        const [valueField, validFlag] = this.phone(validValue, field, e);

                        validValue = valueField as string;
                        isValid = validFlag as boolean;
                    } else if (type === 'address') {
                        const [valueField, validFlag] = this.separateString(validValue, field, e);

                        validValue = valueField as string;
                        isValid = validFlag as boolean;
                    } else if (type === 'email') {
                        const [valueField, validFlag] = this.email(validValue, field);

                        validValue = valueField as string;
                        isValid = validFlag as boolean;
                    } else {
                        validValue = value;
                    }

                    break;
                }
                case 'length': {
                    const [valueField, validFlag] = this.length(validValue, field.validation.length as number, field);
                    validValue = valueField as string;
                    isValid = validFlag as boolean;
                    break;
                }
                case 'minLength': {
                    const [valueField, validFlag] = this.minLength(validValue, field);
                    validValue = valueField as string;
                    isValid = validFlag as boolean;
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

    separateString(value: string, field: IFieldForm, e: InputEvent) {
        let isValid = true;

        const words = value
            .trim()
            .split(' ')
            .filter((el) => el);

        if (words.length > field.validation.wordCount! - 1) {
            const name = words.every((el) => el.length > field.validation.wordLength! - 1);

            if (!name) {
                field.errors?.push(`Every word in name should consist of ${field.validation.wordLength} letters`);
                isValid = false;
            } else {
                (field.errors as Array<string>).length = 0;
                isValid = true;
            }
        } else {
            field.errors?.push(`Name should consist of ${field.validation.wordCount} words`);
            isValid = false;
        }

        const isLetters = this.lettersOnly(field.value, field, e);

        return [isLetters[0], isValid];
    }

    email(value: string, field: IFieldForm) {
        let isValid = false;

        const existAt = value.indexOf('@');
        const existDot = value.lastIndexOf('.');

        if (existAt > -1 && existDot > -1 && existAt < existDot && !value.endsWith('.')) {
            isValid = true;
            (field.errors as Array<string>).length = 0;
        } else {
            field.errors?.push('Format email is: username@mail.ru');
            isValid = false;
        }

        return [value, isValid];
    }

    cardDate(value: string, field: IFieldForm, e: InputEvent) {
        let isValid = true;
        let validValue = value;

        const hasSlash = validValue.indexOf('/') > -1;

        if (validValue.length === 2 && +validValue > 12) {
            validValue = '12';
        }

        if (validValue.length === 2 && !hasSlash && !field.isBackward) {
            validValue = validValue + '/';
        }

        const date = validValue.split('/').slice(0, 2);

        if (date.length === 2) {
            let [monthValue] = this.numbersOnly(date[0], field, e);
            const [isValidMonth] = this.numbersOnly(date[0], field, e);
            let [yearValue] = this.numbersOnly(date[1], field, e);
            const [isValidYear] = this.numbersOnly(date[1], field, e);

            if (yearValue.length > 2) {
                yearValue = yearValue.slice(0, 2);
            }

            if (monthValue.length > 2) {
                monthValue = monthValue.slice(0, 2);
            }

            if (+monthValue > 12) {
                monthValue = '12';
            }

            if (monthValue.length === 2 && isValidMonth && yearValue.length === 2 && isValidYear) {
                const dateString = monthValue + '/' + yearValue;

                return [dateString, isValid];
            } else {
                field.errors?.push('Date format is MM/YY');
                isValid = false;

                return [monthValue + '/' + yearValue, isValid];
            }
        } else if (date.length === 1) {
            field.errors?.push('Date format is MM/YY');
            isValid = false;

            const valueMonth = this.numbersOnly(validValue, field, e);

            return [valueMonth[0], isValid];
        } else {
            isValid = false;
        }

        return [validValue, isValid];
    }

    phone(value: string, field: IFieldForm, e: InputEvent) {
        let isValid = true;
        let validValue = value;

        if (validValue.startsWith('+')) {
            const valid = validValue.slice(1, validValue.length);
            const [numbers, isValidation] = this.numbersOnly(valid, field, e);
            isValid = isValidation;
            const [valueFiled, isRight] = this.minLength('+' + numbers, field);
            isValid = isRight;
            validValue = valueFiled;
        } else {
            field.errors?.push('Phone should start with +');
            isValid = false;
        }

        return [validValue, isValid];
    }

    private minLength(value: string, field: IFieldForm) {
        let isValid = false;

        const minLength = field.validation.minLength as number;

        const indexError = field.errors?.indexOf('The field must contain at least ${minLength} characters') as number;

        if (value.length < minLength) {
            isValid = false;

            field.errors?.push(`The field must contain at least ${minLength} characters`);
        } else {
            if (indexError > -1) {
                (field.errors as Array<string>).splice(indexError, 1);
            }
            isValid = true;
        }

        return [value, isValid] as [string, boolean];
    }

    private lettersOnly(value: string, field: IFieldForm, e: InputEvent) {
        const isString = value.match(/[A-Za-z]|-| /g);

        let validValue;
        let isValid = true;

        const indexError = field.errors?.indexOf('Field should contain only letters') as number;

        if (isString) {
            if (isString.length !== value.length) {
                if (indexError === -1) {
                    (field.errors as Array<string>).length = 0;
                    field.errors?.push('Field should contain only letters');
                }
                const indexChar = value.indexOf(e.data as string, 0) as number;

                validValue = value.slice(0, indexChar) + value.slice(indexChar + 1);
                isValid = false;
            } else {
                if (indexError >= 0) {
                    (field.errors as Array<string>).length = 0;
                }

                validValue = value;
                isValid = true;
            }
        } else {
            if (indexError === -1 && !field.isBackward) {
                (field.errors as Array<string>).length = 0;
                field.errors?.push('Field should contain only letters');
            }

            if (indexError > -1 && field.isBackward) {
                (field.errors as Array<string>).splice(indexError, 1);
            }

            isValid = false;
            validValue = '';
        }

        return [validValue, isValid] as [string, boolean];
    }

    private numbersOnly(value: string, field: IFieldForm, e: InputEvent) {
        const isNumber = value.match(/[0-9]/g);

        let validValue = '';
        let isValid = true;

        const indexError = field.errors?.indexOf('Field should contain only numbers') as number;

        if (isNumber?.length !== value.length) {
            if (indexError === -1 && !field.isBackward) {
                (field.errors as Array<string>).length = 0;
                field.errors?.push('Field should contain only numbers');
            }

            const indexChar = value.indexOf(e.data as string, 0) as number;

            validValue = value.slice(0, indexChar) + value.slice(indexChar + 1);
            isValid = false;
        } else {
            (field.errors as Array<string>).length = 0;

            validValue = value;
            isValid = true;
        }

        return [validValue, isValid] as [string, boolean];
    }

    private length(value: string, length: number, field: IFieldForm) {
        let isValid = true;

        const indexError = field.errors?.indexOf(`The number of characters must be ${length}`);

        if (value.length - 1 === length && !field.isBackward) {
            isValid = true;
            (field.errors as Array<string>).length = 0;
            field.value = value.slice(0, value.length - 1);
        }

        if (!field.isBackward) {
            if (field.value.length !== length) {
                if (value.length > length) {
                    field.value = value.slice(0, length);
                    isValid = true;
                } else {
                    field.value = value;
                    isValid = false;
                }

                if (indexError === -1) {
                    field.errors?.push(`The number of characters must be ${length}`);
                }
            }
        } else {
            field.value = value;

            if (indexError === -1) {
                field.errors?.push(`The number of characters must be ${length}`);
            }

            isValid = false;
        }

        return [field.value, isValid] as [string, boolean];
    }
}

export default FormStore;
