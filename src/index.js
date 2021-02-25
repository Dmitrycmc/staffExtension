import {appendSalaryInfo} from "./salary-info";
import {appendExactNumberVacationDays} from "./vacation/vacation";
import {appendWorkTracker} from "./work-tracker/work-tracker";

import './global.css';

chrome.storage.sync.set({startTime: 1614240000603});

appendSalaryInfo();
appendExactNumberVacationDays();
appendWorkTracker();

