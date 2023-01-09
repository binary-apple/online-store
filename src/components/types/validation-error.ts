import { IFieldForm } from '../../model/types/form';

export interface ValidationError {
    input: HTMLElement;
    fieldname: string;
    field: IFieldForm;
    checkname: Array<string>;
}
