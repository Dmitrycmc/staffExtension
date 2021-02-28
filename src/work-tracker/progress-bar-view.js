import {appendDiv} from "../helpers/dom";

export default (parentNode, n) => {
    const progressBar = appendDiv(parentNode, null, 'progress-bar', {
        gridTemplateColumns: `repeat(${n}, 1fr)`
    });
    const labelNode = appendDiv(progressBar, null, 'progress-bar__label');
    const progressLine = appendDiv(progressBar, null, 'progress-line');

    const cellsProgresses = [];
    for (let i = 0; i < n; i++) {
        const cellOuter = appendDiv(progressBar, null, 'cell-outer');
        const cellInner = appendDiv(cellOuter, null, 'cell-inner');
        cellsProgresses.push(cellInner);
    }

    const setProgress = progress => {
        progressLine.style.width = `calc(${progress * 100}% - 3px)`;
        for (let i = 0; i < n; i++) {
            if ((i + 1) / n < progress) {
                cellsProgresses[i].style.width = '100%';
            } else if (i / n > progress) {
                cellsProgresses[i].style.width = '0%';
            } else {
                cellsProgresses[i].style.width = `calc((100% + 6px) * ${progress * n - i} - 3px)`;
            }
        }
    };

    return [progressBar, setProgress, labelNode];
};
