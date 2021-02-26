import appendProgressBarView from "./progress-bar-view";
import {chromeStorageGet} from "../helpers/chrome";

const N = 8;

export default async parentNode => {
    const [progressBar, setProgress, setTime] = appendProgressBarView(parentNode, N);

    let timerId;

    async function updateAndPlan() {
        const [startTime] = await chromeStorageGet('startTime');
        const progress = (new Date().getTime() - startTime) / (N * 60 * 60 * 1000);

        setProgress(progress);
        setTime(new Date(new Date().getTime() - startTime).toISOString().split(/[TZ]/)[1].split(':').slice(0, 2).join(':'));

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
        if (state.newValue === 'stopped') {
            clearTimeout(timerId);
            setProgress(0);
            setTime("");
        }
    });

    return progressBar;
};
