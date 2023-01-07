interface IValidation {
    required: true;
    valueType: string;
    maxLength: number;
    minLength: number;
}

export interface IFieldForm {
    value: string;
    validation: Partial<IValidation>;
    isValid: boolean;
    isDirty: boolean;
    notType: boolean;
    isBackward: boolean;
}

export interface ValidationObject {
    [index: string]: IFieldForm;
}
