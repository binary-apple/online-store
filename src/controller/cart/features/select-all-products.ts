class SelectAllProducts {
    init() {
        const selectAllCb = document.getElementById('select-all');

        if (selectAllCb) {
            const selectAll = this.selectAll.bind(this);
            const selectBack = this.selectBack.bind(this);

            selectAllCb.addEventListener('change', (e) => {
                const { target } = e;

                const htmlTarget = target as HTMLInputElement;

                const products = document.querySelector('.cart-products');

                if (products) {
                    const checkboxs = [...products.querySelectorAll('.checkbox-fake__input')];

                    if (htmlTarget.checked) {
                        selectAll(checkboxs);
                    } else {
                        selectBack(checkboxs);
                    }
                }
            });
        }
    }

    selectAll(checkboxs: Array<Element>) {
        if (checkboxs.length) {
            checkboxs.forEach((item) => {
                (item as HTMLInputElement).checked = true;
            });
        }
    }

    selectBack(checkboxs: Array<Element>) {
        if (checkboxs.length) {
            checkboxs.forEach((item) => {
                (item as HTMLInputElement).checked = false;
            });
        }
    }
}

export default SelectAllProducts;
