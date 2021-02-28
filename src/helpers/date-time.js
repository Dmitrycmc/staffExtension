const DAYS_OF_WEEK = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
];

const MONTHS = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
];

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const getDateString = date => new Date(date).toISOString().split('T')[0];

export const getTimeString = date => new Date(date).toISOString().split('T')[1];

export const shiftDate = (date, days) => {
    const tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + days);
    return tempDate;
};

export const setDate = (date, day) => {
    const tempDate = new Date(date);
    tempDate.setDate(day);
    return tempDate;
}

export const getDayOfWeekString = date => DAYS_OF_WEEK[new Date(date).getDay()];

export const getMonthString = date => MONTHS[new Date(date).getMonth()];

export const diffDatesMs = (date1, date2) => new Date(date1).getTime() - new Date(date2).getTime();

export const getDiffInDays = (date1, date2) => diffDatesMs(getDateString(date1), getDateString(date2)) / DAY;
