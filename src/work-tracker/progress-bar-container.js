import appendProgressBarView from "./progress-bar-view";
import {chromeStorageGet, chromeStorageSet} from "../helpers/chrome";
import {getDateString, getDayOfWeekString, shiftDate} from "../helpers/date-time";
import {getNextWorkingDate} from "../helpers/is-day-off";

const N = 8;

const v = 1;
const FULL_DAY = (N / v * 60 * 60 * 1000);

const INTERVAL = 1000;

export default async parentNode => {
    const [progressBar, setProgress, labelNode] = appendProgressBarView(parentNode, N);

    let timerId;

    const update = async () => {
        const [state, startTime, endTime, workingDate] = await chromeStorageGet('state', 'startTime', 'endTime', 'workingDate');

        const actualEndTime = state === "playing" ? new Date().getTime() : endTime;

        const passedTime = actualEndTime - startTime;

        if (passedTime > FULL_DAY) {
            const nextWorkingDate = await getNextWorkingDate(shiftDate(workingDate, 1));
            await chromeStorageSet({
                workingDate: getDateString(nextWorkingDate),
                startTime: startTime + FULL_DAY
            });
        }

        const progress = (passedTime % FULL_DAY) / FULL_DAY;

        setProgress(progress);
    };

    const plan = () => {
        timerId = setInterval(update, INTERVAL);
    };

    const [state, workingDate] = await chromeStorageGet('state', 'workingDate');

    labelNode.innerText = getDayOfWeekString(workingDate);

    update();
    if (state === 'playing') {
        plan();
    }

    chrome.storage.sync.onChanged.addListener(({state, workingDate}) => {
        if (state) {
            if (state.newValue === 'playing') {
                plan();
            }
            if (state.newValue === 'paused') {
                clearTimeout(timerId);
            }
        }
        if (workingDate) {
            labelNode.innerText = getDayOfWeekString(workingDate.newValue);
        }
    });

    return progressBar;
};
