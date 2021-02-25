import {appendDiv} from "../helpers/dom";
import {chromeStorageGet, chromeStorageSet} from "../helpers/chrome";


const appendController = async (parentNode) => {
    const container = appendDiv(parentNode);

    const [state] = await chromeStorageGet('state');

    const playButton = appendDiv(container, 'play', state === 'playing' ? 'hidden' : '');
    playButton.onclick = async () => {
        const [startTime, endTime] = await chromeStorageGet('startTime', 'endTime');
        chromeStorageSet({
            state: 'playing',
            startTime: new Date().getTime() - (startTime && endTime ? (endTime - startTime) : 0)
        });
    };

    const pauseButton = appendDiv(container, 'pause', state === 'paused' ? 'hidden' : '');
    pauseButton.onclick = () => {
        chromeStorageSet({
            state: 'paused',
            endTime: new Date().getTime()
        });
    };

    chrome.storage.sync.onChanged.addListener(({state}) => {
        if (!state) return;
        if (state.newValue === 'paused') {
            pauseButton.classList.add('hidden');
            playButton.classList.remove('hidden');
        }
        if (state.newValue === 'playing') {
            playButton.classList.add('hidden');
            pauseButton.classList.remove('hidden');
        }
    });
};

export default appendController;
