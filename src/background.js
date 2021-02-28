import {chromeStorageGet, chromeStorageRemove, chromeStorageSet} from "./helpers/chrome";
import {getDateString} from "./helpers/date-time";
import {getNextWorkingDate} from "./helpers/is-day-off";

chrome.runtime.onInstalled.addListener(async () => {
  const [workingDate] = await chromeStorageGet('workingDate');

  if (workingDate === undefined) {
    const nextWorkingDate = getDateString(await getNextWorkingDate());
    await chromeStorageSet({workingDate: nextWorkingDate});
    console.log(`Working day set to ${nextWorkingDate}`);
  } else {
    console.log(`Working day already written: ${workingDate}`);
  }
});
