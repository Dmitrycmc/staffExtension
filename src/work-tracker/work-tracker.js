import {appendDiv} from "../helpers/dom";

const N = 8;

export const appendWorkTracker = () => {
    chrome.storage.sync.get('startTime', ({startTime}) => {
        const parentNode = document.querySelector('.b-profile__head');
        const progressBar = appendDiv(parentNode, null, 'progress-bar', {
            gridTemplateColumns: `repeat(${N}, 1fr)`
        });
        const progressLine = appendDiv(progressBar, null, 'progress-line');

        const cellsProgresses = [];
        for (let i = 0; i < N; i++) {
            const cellOuter = appendDiv(progressBar, null, 'cell-outer');
            const cellInner = appendDiv(cellOuter, null, 'cell-inner');
            cellsProgresses.push(cellInner);
        }

        function updateAndPlan() {
            const progress = (new Date().getTime() - startTime) / (N * 60 * 60 * 1000);
            progressLine.style.width = `calc(${progress * 100}% - 2px)`;
            for (let i = 0; i < N; i++) {
                if ((i + 1) / N < progress) {
                    cellsProgresses[i].style.width = '100%';
                } else if (i / N > progress) {
                    cellsProgresses[i].style.width = '0%';
                } else {
                    cellsProgresses[i].style.width = `calc((100% + 6px) * ${progress * N - i} - 3px)`;
                }
            }

            setTimeout(updateAndPlan, 10000);
        }

        updateAndPlan();
    });

    setTimeout(() => {
    },);


};
