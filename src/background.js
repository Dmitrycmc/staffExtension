const today = new Date().toISOString().split('T')[0];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('startDate', ({startDate}) => {
    if (startDate === undefined) {
      chrome.storage.sync.set({ startDate: today });
      console.log(`Start date set to ${today}`);
    } else {
      console.log(`Start date already written: ${startDate}`);
    }
  });
});
