import {polling} from "../helpers/async";
import {appendDiv} from "../helpers/dom";
import {isDayOff} from "../helpers/is-day-off";
import {diffDatesMs, getDiffInDays, getMonthString, setDate, shiftDate} from "../helpers/date-time";

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
        if (diffDatesMs(tempDate, new Date()) < 0) {
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
    const salaryInfoText3 = `${tempDate.getDate()} ${getMonthString(tempDate)}`;
    appendDiv(parentNode, salaryInfoText3, 'b-profile__text', {marginTop: '10px', lineHeight: '20px'});
};
