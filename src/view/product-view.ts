import BaseView from './base-view';
import BreadCrumbs from '../components/breadcrumbs';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import ProductContent from '../components/product/product-content';
import { Product } from '../model/types/product';

class ProductView extends BaseView {
    private content: ProductContent;
    private breadcrumbs: BreadCrumbs;
    private header: Header;
    private footer: Footer;

    constructor(product: Product) {
        super();

        this.header = new Header();
        this.footer = new Footer();
        this.breadcrumbs = new BreadCrumbs(product);
        this.content = new ProductContent();
    }

    init() {
        this.root.append(this.header.render());
        this.root.append(this.container);
        this.container.append(this.breadcrumbs.render());
        this.container.append(this.content.render());
        this.root.append(this.footer.render());
    }
}

export default ProductView;
