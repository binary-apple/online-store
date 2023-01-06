import BaseView from './base-view';
import BreadCrumbs from '../components/breadcrumbs';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import ProductContent from '../components/product/product-content';
import { Product } from '../model/types/product';
import { Cart } from '../model/cart';
import { View } from './types/view';

class ProductView extends BaseView implements View {
    private content: ProductContent;
    private breadcrumbs: BreadCrumbs;
    private header: Header;
    private footer: Footer;
    cart: Cart;
    product: Product;

    constructor(product: Product, cart: Cart) {
        super();
        this.cart = cart;
        this.product = product;

        this.header = new Header(this.cart);
        this.footer = new Footer();

        const breadcrumbs = this.getBreadcrumbs(product);

        this.breadcrumbs = new BreadCrumbs(breadcrumbs);
        this.content = new ProductContent(product, cart);
    }

    init() {
        this.root.append(this.header.render());
        this.root.append(this.container);
        this.container.append(this.breadcrumbs.render());
        this.container.append(this.content.render());
        this.root.append(this.footer.render());

        this.zoomImage();
        this.changeQuntityProduct();
    }

    getBreadcrumbs(product: Product) {
        return [
            {
                link: '/',
                name: 'Main',
            },
            {
                link: '',
                name: product.category.toLowerCase().trim(),
            },
            {
                link: '',
                name: product.brand.toLowerCase().trim(),
            },
            {
                link: '',
                name: product.title.toLowerCase().trim(),
            },
        ];
    }

    public addProdcutToCard(callback: (product: Product, type: string) => void) {
        this.content.addProdcutToCard(callback);
    }

    private zoomImage() {
        this.content.zoomImage();
    }

    public makeOrder(callback: (product: Product) => void) {
        this.content.makeOrder(callback);
    }

    private changeQuntityProduct() {
        this.content.changeQuntityProduct();
    }
}

export default ProductView;
