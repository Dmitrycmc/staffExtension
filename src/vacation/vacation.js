import {DAY, diffDatesMs} from "../helpers/date-time";

export const appendExactNumberVacationDays = () => {
    const days = Number(((diffDatesMs(new Date(), new Date('12/08/2020'))) / DAY / 365.25 * 28).toFixed(2));

    [...document.querySelectorAll('.b-profile__text')]
        .find(node => node.innerText.toLowerCase().includes("накопилось"))
        .innerText += ` (${days})`;
};
