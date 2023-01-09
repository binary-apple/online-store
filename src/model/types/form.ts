interface IValidation {
    required: true;
    valueType: string;
    maxLength: number;
    length: number;
    minLength: number;
    wordCount: number;
    wordLength: number;
}

export interface IFieldForm {
    value: string;
    validation: Partial<IValidation>;
    isValid: boolean;
    isDirty: boolean;
    notType: boolean;
    isBackward: boolean;
    errors?: Array<string>;
}

export interface ValidationObject {
    [index: string]: IFieldForm;
}
