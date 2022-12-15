import { IContext } from "../../../app/types/IApp";

export interface IRenderComponent {
    render(): string;
    init(context: IContext): string | Promise<string>;
}