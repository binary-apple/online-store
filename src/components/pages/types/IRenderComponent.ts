export interface IRenderComponent {
    render(): string;
    init(): string | Promise<string>;
}
