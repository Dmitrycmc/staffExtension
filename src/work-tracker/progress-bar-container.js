import appendProgressBarView from "./progress-bar-view";
import {chromeStorageGet} from "../helpers/chrome";

const N = 8;

const v = 1;
const FULL_DAY = (N / v * 60 * 60 * 1000);

const INTERVAL = 1000;

export default async parentNode => {
    const [progressBar, setProgress, setLabel] = appendProgressBarView(parentNode, N);

    let timerId;

    const update = async () => {
        const [state, startTime, endTime] = await chromeStorageGet('state', 'startTime', 'endTime');

        const actualEndTime = state === "playing" ? new Date().getTime() : endTime;

        const passedTime = actualEndTime - startTime;

        const progress = (passedTime % FULL_DAY) / FULL_DAY;

        setProgress(progress);

        setLabel(passedTime > FULL_DAY ? `На ${Math.floor(passedTime / FULL_DAY)} день впереди` : "");
    };

    const plan = () => {
        timerId = setInterval(update, INTERVAL);
    };

    const [state] = await chromeStorageGet('state');

    if (state !== "stopped") {
        update();
    }
    if (state === 'playing') {
        plan();
    }

    chrome.storage.sync.onChanged.addListener(({state}) => {
        if (!state) return;
        if (state.newValue === 'playing') {
            plan();
        }
        if (state.newValue === 'paused') {
            clearTimeout(timerId);
        }
        if (state.newValue === 'stopped') {
            clearTimeout(timerId);
            setProgress(0);
            setLabel("00:00:00");
        }
    });

    return progressBar;
};
