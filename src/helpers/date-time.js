const DAYS = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
];

export const getDateString = date => new Date(date).toISOString().split('T')[0];

export const getTimeString = date => new Date(date).toISOString().split('T')[1];

export const shiftDate = (date, days) => {
    const tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + days);
    return tempDate;
};

export const getDayOfWeekString = date => DAYS[new Date(date).getDay()];
