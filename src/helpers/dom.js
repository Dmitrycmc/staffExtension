export const appendDiv = (parentNode, text, className, style) => {
    const node = document.createElement('div');
    parentNode.append(node);
    if (text) {
        node.innerText = text;
    }
    if (className) {
        node.className = className;
    }
    for (let prop in style) {
        node.style[prop] = style[prop];
    }
    return node;
};
