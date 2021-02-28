import {getDateString} from "./date-time";

export const isDayOff = async date => {
    const response = await fetch(`https://isdayoff.ru/${getDateString(date)}`);
    const json = await response.json();
    return json === 1;
};

export const getNextWorkingDay = async (date = new Date()) => {
    while (true) {
        if (await isDayOff(date)) {
            date.setDate(date.getDate() + 1);
        } else {
            return date;
        }
    };
}
