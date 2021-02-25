chrome.storage.sync.onChanged.addListener(value => {
    console.log(value);
});

import './work-tracker';
import "./salary-info";
import "./vacation";

import './global.css';

appendSalaryInfo();
appendExactNumberVacationDays();

