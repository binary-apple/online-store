class Utils {
    replaceItem(item: HTMLElement) {
        const clone = item.cloneNode(true);

        const parent = item.parentNode;
        const nextElement = item.nextElementSibling;

        if (parent && nextElement) {
            parent.insertBefore(clone, nextElement);
        } else if (parent && !nextElement) {
            parent.append(clone);
        }

        item.remove();

        return clone;
    }

    getPathName() {
        const currentUrl = new URL(window.location.href);

        return  currentUrl.pathname;
    }
}

export default Utils;
