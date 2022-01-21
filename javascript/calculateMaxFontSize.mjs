const isOverflown = (element) => element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;

const fontSizeSearch = (min, max, current, precision, element, level = 0, lastAccaptable = null) => {
    element.style.fontSize = `${current}vh`;
    if (isOverflown(element)) {
        const nextCurrent = Math.round(min + (current - min)/2);
        if (Math.abs(nextCurrent - current) < precision && lastAccaptable !== null) return lastAccaptable;
        return fontSizeSearch(min, current, nextCurrent, precision, element, level + 1, lastAccaptable);
    } else {
        const nextCurrent = Math.round(current + (max - current)/2);
        if (Math.abs(nextCurrent - current) < precision) return current;
        return fontSizeSearch(current, max, nextCurrent, precision, element, level + 1, current);
    }
};

export default element => {
    const div = document.createElement('DIV');
    div.style.position = 'fixed';
    div.style.top = 0;
    div.style.left = 0;
    div.style.bottom = 0;
    div.style.right = 0;
    div.style.lineHeight = 1.3;
    div.innerHTML = element.innerHTML;
    document.body.appendChild(div);
    
    const min = 10;
    const max = 100;
    const current = 45;
    const precision = 2;
    const size = fontSizeSearch(min, max, current, precision, div);

    element.style.fontSize = `${size}vh`;
    div.style.fontSize = `${size}vh`;
    
    div.remove();
}