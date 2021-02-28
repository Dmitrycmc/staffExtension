import {polling} from "../helpers/async";
import {appendDiv} from "../helpers/dom";
import {isDayOff} from "../helpers/is-day-off";

const compDates = (date1, date2) => new Date(date1).getTime() - new Date(date2).getTime();

const shiftDate = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const setDate = (date, day) => {
    const result = new Date(date);
    result.setDate(day);
    return result;
}

const getDiffInDays = (date1, date2) => {
    return (new Date(date1.toISOString().split('T')[0]).getTime() - new Date(date2.toISOString().split('T')[0]).getTime()) / 1000 / 60 / 60 / 24
};

const getNextSalaryDate = (date = new Date()) => {
    let day = date.getDate();
    if (day <= 5) {
        return setDate(date, 5);
    }
    if (5 < day && day <= 20) {
        return setDate(date, 20);
    }
    date.setMonth(date.getMonth() + 1);
    return setDate(date, 5);
};

const monthStrings = [
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

const getDiffText = date => {
    const diff = getDiffInDays(date, new Date());

    if (diff === 0) {
        return 'Сегодня';
    }
    if (diff === 1) {
        return 'Завтра';
    }
    if (diff === 2) {
        return 'Послезавтра';
    }
    return `Через ${diff} дней`;
};

export const appendSalaryInfo = async () => {
    const nextSalaryDate = getNextSalaryDate();
    const afterNextSalaryDate = getNextSalaryDate(shiftDate(nextSalaryDate, 1));

    let tempDate = nextSalaryDate;

    while (true) {
        if (compDates(tempDate, new Date()) < 0) {
            tempDate = afterNextSalaryDate;
        }
        if (await isDayOff(tempDate)) {
            tempDate = shiftDate(tempDate, -1);
        } else {
            break;
        }
    }

    const parentNode = await polling(() => document.querySelector('.StaffIsland.Finances'), 50, 10);
    if (!parentNode) return;

    const salaryInfoText1 = 'Следующая зарплата';
    appendDiv(parentNode, salaryInfoText1, 'b-profile__text', {marginTop: '10px', lineHeight: '20px'});
    const salaryInfoText2 = getDiffText(tempDate);
    appendDiv(parentNode, salaryInfoText2, 'b-profile__text b-profile__text_size_big', {
        marginTop: '10px',
        lineHeight: '20px'
    });
    const salaryInfoText3 = `${tempDate.getDate()} ${monthStrings[tempDate.getMonth()]}`;
    appendDiv(parentNode, salaryInfoText3, 'b-profile__text', {marginTop: '10px', lineHeight: '20px'});
};
