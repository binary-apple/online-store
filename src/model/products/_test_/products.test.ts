import { Products } from '../products';
import { Product } from '../../types/product';
import { IFilter } from '../../types/filter';
import Filter from '../filter';
import { Subscriber, Publisher } from '../../../utils/observer-interface';
import { FilterMetric } from '../../types/filter';


/* Products.filter */

describe('Products.filter should filter the products correctly', () => {
    const product: Product = {
        id: 100500,
        category: 'Laptop',
        brand: 'apple',
        price: 9990,
        stock: 100,
        rating: 5.0,
        discountPercentage: 0.1,
        description: 'The best laptop ever',
        title: 'MacBook',
        thumbnail: 'thumbnail',
        images: ['image1', 'image2']
    }
    const products = new Products([product]);
    
    const filter: IFilter = new Filter({search: 'thumb'}).get();

    products.filter(filter);

    it.each([
        [{search: 'thumb'}, []],
        [{search: 'image'}, []],
        [{search: 'app   '}, [product]],
        [{search: '999'}, [product]],
    ])('search only significant params %p expecting %p', (filter: Partial<IFilter>, expected: Array<Product>) => {
        products.filter(new Filter(filter).get());
        expect(products.filtred).toEqual(expected);
    });

    it.each([
        [{categories: ['laptop', 'watch'], brands: ['apple']}, [product]],
        [{price: {from: 1, to: 9999, max: Infinity, min: 0}, stock: {from: 1, to: 99, max: Infinity, min: 0}}, []],
    ])('handle few filters %p expecting %p', (filter: Partial<IFilter>, expected: Array<Product>) => {
        products.filter(new Filter(filter).get());
        expect(products.filtred).toEqual(expected);
    });
});

/* Products.getTotalRange &  Products.getFilteredRange & Products.getFilterMetrics */

describe('Products.get-methods should return correct values', () => {
    const product: Product = {
        id: 100500,
        category: 'Laptop',
        brand: 'apple',
        price: 9990,
        stock: 100,
        rating: 5.0,
        discountPercentage: 0.1,
        description: 'The best laptop ever',
        title: 'MacBook',
        thumbnail: 'thumbnail',
        images: ['image1', 'image2']
    }

    const product2: Product = {
        id: 1,
        category: 'Laptop',
        brand: 'apple',
        price: 10,
        stock: 100,
        rating: 2.0,
        discountPercentage: 0.1,
        description: 'The best laptop ever',
        title: 'MacBook',
        thumbnail: 'thumbnail',
        images: ['image1', 'image2']
    }

    const product3: Product = {
        id: 10,
        category: 'Laptop',
        brand: 'apple',
        price: 50,
        stock: 100,
        rating: 2.0,
        discountPercentage: 0.1,
        description: 'The best laptop ever',
        title: 'MacBook',
        thumbnail: 'thumbnail',
        images: ['image1', 'image2']
    }

    const products = new Products([product, product2, product3]);
    const filter: IFilter = new Filter({price : {min: 0, max: Infinity, from: 50, to: 9999}}).get();
    products.filter(new Filter(filter).get());

    test('getFilterMetrics should work correctly', () => {
        expect(products.getMetrics()).toEqual({categories: {laptop: {available: 2, total: 3}}, brands: {apple: {available: 2, total: 3}}});
    });    
    
    test('getTotalRange should work correctly', () => {
        expect(products.getTotalRange('price')).toEqual({min: 10, max: 9990});
    });
    
    test('getFilteredRange should work correctly', () => {
        expect(products.getFilteredRange('price')).toEqual({min: 50, max: 9990});
    });
});

/* Products.set */

describe('Products.set should set products correctly & notify all subscribers', () => {
    const product: Product = {
        id: 100500,
        category: 'Laptop',
        brand: 'apple',
        price: 9990,
        stock: 100,
        rating: 5.0,
        discountPercentage: 0.1,
        description: 'The best laptop ever',
        title: 'MacBook',
        thumbnail: 'thumbnail',
        images: ['image1', 'image2']
    }
    const products = new Products([]);
    
    class FakeSubscriber implements Subscriber {
        public numCalls = 0;

        update(publisher: Publisher) {
            this.numCalls++;
        }
    }    
    test('set new Products & call notify', () => {
        const subscriber = new FakeSubscriber();
        products.attach(subscriber);
        products.set([product]);
        expect(subscriber.numCalls).toEqual(1);
    });
});