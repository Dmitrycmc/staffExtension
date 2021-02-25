export const chromeStorageGet = (...names) => new Promise(res => {
    chrome.storage.sync.get(names, storage => {res(names.map(name => storage[name]))});
});

export const chromeStorageRemove = (...names) => new Promise(res => {
    chrome.storage.sync.remove(names, res);
});

export const chromeStorageSet = values => new Promise(res => {
    chrome.storage.sync.set(values, res);
});
