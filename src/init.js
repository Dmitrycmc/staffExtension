import {chromeStorageGet, chromeStorageSet} from "./helpers/chrome";

export default async () => {
    if ((await chromeStorageGet('state'))[0] === undefined) {
        await chromeStorageSet({state: 'paused'});
    }

    const [state, startTime, endTime] = await chromeStorageGet('state', 'startTime', 'endTime');
    console.log("Init state: ", {state, startTime, endTime});

    chrome.storage.sync.onChanged.addListener(value => {
        console.log(value);
    });

};
