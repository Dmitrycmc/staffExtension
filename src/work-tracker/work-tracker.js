import {appendDiv} from "../helpers/dom";

export const appendWorkTracker = () => {
    chrome.storage.sync.get('startTime', ({startTime}) => {
        const parentNode = document.querySelector('.b-profile__head');
        const progressBar = appendDiv(parentNode, null, 'progress-bar');
        const progressLine = appendDiv(progressBar, null, 'progress-line');

        const cellsProgresses = [];
        for (let i = 0; i < 8; i++) {
            const cellNode = appendDiv(progressBar, null, 'cell-wrapper');
            const cellProgress = appendDiv(cellNode, null, 'cell-progress');
            cellsProgresses.push(cellProgress);
        }

        function updateAndPlan() {
            const progress = (new Date().getTime() - startTime) / (9 * 60 * 60 * 1000);
            progressLine.style.width = `${progress * 100}%`;
            for (let i = 0; i < 8; i++) {
                if ((i + 1) / 8 < progress) {
                    cellsProgresses[i].style.width = '100%';
                } else if (i / 8 > progress) {
                    cellsProgresses[i].style.width = '0%';
                } else {
                    cellsProgresses[i].style.width = `${(progress - i / 8) * 8 * 100}%`;
                }
            }

            setTimeout(updateAndPlan, 15000);
        }

        updateAndPlan();
    });

    setTimeout(() => {
    },);


};
