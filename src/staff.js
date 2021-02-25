import './global.css';

const sleep = timeout => new Promise(res => setTimeout(res, timeout));

const polling = async (getter, period, attempts) => {
    let result;
    for (let i = 0; i < attempts; i++) {
        result = getter();
        if (result) return result;
        await sleep(period);
    }
};

const appendExactNumberVacationDays = () => {
    const days = Number(((new Date().getTime() - new Date('12/08/2020'))/1000/60/60/24/365*28).toFixed(2));

    [...document.querySelectorAll('.b-profile__text')]
        .find(node => node.innerText.toLowerCase().includes("накопилось"))
        .innerText += ` (${days})`;
};

const isDayOff = (date) => new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://isdayoff.ru/${new Date(date).toISOString().split('T')[0]}`, true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status == 200) {
            res(xhr.responseText === "1");
        } else {
            rej(xhr.status + ': ' + xhr.statusText);
        }
    }
});

const compDates = (date1, date2) => new Date(date1).getTime() - new Date(date2).getTime();

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
    return (new Date(date1.toISOString().split('T')[0]).getTime() - new Date(date2.toISOString().split('T')[0]).getTime())/1000/60/60/24
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
    return `Через ${ diff } дней`;
};

const appendDiv = (parentNode, text, className, style ) => {
    const node = document.createElement('div');
    if (text) {
        node.innerText = text;
    }
    node.className = className;
    for (let prop in style) {
        node.style[prop] = style[prop];
    }
    parentNode.append(node);
    return node;
};

const appendSalaryInfo = async () => {
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
    appendDiv(parentNode, salaryInfoText2, 'b-profile__text b-profile__text_size_big', {marginTop: '10px', lineHeight: '20px'});
    const salaryInfoText3 = `${tempDate.getDate()} ${monthStrings[tempDate.getMonth()]}`;
    appendDiv(parentNode, salaryInfoText3, 'b-profile__text', {marginTop: '10px', lineHeight: '20px'});
};

appendSalaryInfo();
appendExactNumberVacationDays();


const appendWorkTracker = () => {
    chrome.storage.sync.get('startTime', ({startTime}) => {
        const parentNode = document.querySelector('.b-profile__head');
        const progressBar = appendDiv(parentNode, null, 'progress-bar staff-status__state staff-status__state_type_activity');
        const progressLine = appendDiv(progressBar, null, 'progress-line staff-status__state staff-status__state_type_activity');

        function updateAndPlan() {
            progressLine.style.width = `${(new Date().getTime() - startTime)/(9*60*60*10)}%`;
            setTimeout(() => {
                updateAndPlan();
            }, 15000);
        }
        updateAndPlan();
    });

    setTimeout(() => {}, );


};

chrome.storage.sync.set({startTime: 1614240000603});

appendWorkTracker();

