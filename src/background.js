import {chromeStorageGet, chromeStorageSet} from "./helpers/chrome";
import {getDateString} from "./helpers/date-time";
import {getNextWorkingDay} from "./helpers/is-day-off";

chrome.runtime.onInstalled.addListener(async () => {
  const [workingDay] = await chromeStorageGet('workingDay');

  if (workingDay === undefined) {
    const nextWorkingDay = getDateString(await getNextWorkingDay());
    await chromeStorageSet({workingDay: nextWorkingDay});
    console.log(`Working day set to ${nextWorkingDay}`);
  } else {
    console.log(`Working day already written: ${workingDay}`);
  }
});
