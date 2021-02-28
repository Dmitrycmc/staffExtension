import {getDateString} from "./date-time";

export const isDayOff = async date => {
    const url = `https://isdayoff.ru/${getDateString(date)}`;
    const response = await fetch(url);
    const json = await response.json();
    return json === 1;
};

export const getNextWorkingDate = async (date = new Date()) => {
    while (true) {
        if (await isDayOff(date)) {
            date.setDate(date.getDate() + 1);
        } else {
            return date;
        }
    };
}
