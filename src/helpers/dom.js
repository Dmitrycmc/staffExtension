export const appendDiv = (parentNode, text, className, style) => {
    const node = document.createElement('div');
    if (text) {
        node.innerText = text;
    }
    node.className = className;
    for (let prop in style) {
        node.style[prop] = style[prop];
    }
    parentNode.append(node);
    return node;
};
