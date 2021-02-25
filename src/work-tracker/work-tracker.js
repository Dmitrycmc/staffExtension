import {appendDiv} from "../helpers/dom";
import {chromeStorageGet} from "../helpers/chrome";

const N = 2;

export const appendWorkTracker = async (parentNode) => {
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

    let timerId;

    async function updateAndPlan() {
        const [startTime] = await chromeStorageGet('startTime');
        const progress = (new Date().getTime() - startTime) / (N/32 * 60 * 60 * 1000);
        progressLine.style.width = `calc(${progress * 100}% - 3px)`;
        for (let i = 0; i < N; i++) {
            if ((i + 1) / N < progress) {
                cellsProgresses[i].style.width = '100%';
            } else if (i / N > progress) {
                cellsProgresses[i].style.width = '0%';
            } else {
                cellsProgresses[i].style.width = `calc((100% + 6px) * ${progress * N - i} - 3px)`;
            }
        }

        timerId = setTimeout(updateAndPlan, 100);
    }

    const [state] = await chromeStorageGet('state');
    if (state === 'playing') {
        updateAndPlan();
    }

    chrome.storage.sync.onChanged.addListener(({state}) => {
        if (!state) return;
        if (state.newValue === 'playing') {
            updateAndPlan();
        }
        if (state.newValue === 'paused') {
            clearTimeout(timerId);
        }
    });
};
