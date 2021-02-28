import {chromeStorageGet, chromeStorageSet} from "./helpers/chrome";

const logState = async () => {
    const [state, startTime, endTime] = await chromeStorageGet('state', 'startTime', 'endTime');
    console.log("Init state: ", {state, startTime, endTime});
};

export default async () => {
    const [state] = await chromeStorageGet('state');

    if (state === undefined) {
        await chromeStorageSet({state: 'paused'});
    }

    await logState();

    chrome.storage.sync.onChanged.addListener(value => {
        console.log(value);
    });

};