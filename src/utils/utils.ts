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

    getPathName(url: string = window.location.href) {
        const currentUrl = new URL(url);

        return (currentUrl.pathname + currentUrl.search);
    }
}

export default Utils;
