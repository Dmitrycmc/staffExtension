import {appendDiv, appendImg} from "../helpers/dom";
import {chromeStorageGet, chromeStorageSet} from "../helpers/chrome";

import restIcon from '../icons/rest.svg';
import workIcon from '../icons/work.svg';

const appendController = async (parentNode) => {
    const container = appendDiv(parentNode);

    const [state] = await chromeStorageGet('state');

    const playButton = appendImg(container, restIcon, `icon ${state === 'playing' ? 'hidden' : ''}`);
    playButton.onclick = async () => {
        const [startTime, endTime] = await chromeStorageGet('startTime', 'endTime');
        chromeStorageSet({
            state: 'playing',
            startTime: new Date().getTime() - (startTime && endTime ? (endTime - startTime) : 0)
        });
    };

    const pauseButton = appendImg(container, workIcon, `icon ${state !== 'playing' ? 'hidden' : ''}`);
    pauseButton.onclick = () => {
        chromeStorageSet({
            state: 'paused',
            endTime: new Date().getTime()
        });
    };

    /*
    const stopButton = appendDiv(container, 'stop');
    stopButton.onclick = () => {
        chromeStorageSet({state: 'stopped'});
        chromeStorageRemove('startTime', 'endTime');
    };
    */

    chrome.storage.sync.onChanged.addListener(({state}) => {
        if (!state) return;
        if (state.newValue === 'playing') {
            playButton.classList.add('hidden');
            pauseButton.classList.remove('hidden');
        } else {
            pauseButton.classList.add('hidden');
            playButton.classList.remove('hidden');
        }
    });
};

export default appendController;
