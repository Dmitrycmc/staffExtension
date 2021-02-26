import init from './init';

import {appendWorkTracker} from './work-tracker';
import {appendSalaryInfo} from "./salary-info";
import {appendExactNumberVacationDays} from "./vacation";

import './global.css';

init().then(() => {
    appendWorkTracker();
    appendSalaryInfo();
    appendExactNumberVacationDays();
});

