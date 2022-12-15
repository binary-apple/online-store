import { IContext } from "../../app/types/IApp";

export interface IStore {
    name: string;
    init(context: IContext): void;
    required: Array<string>;
}
