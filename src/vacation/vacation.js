export const appendExactNumberVacationDays = () => {
    const days = Number(((new Date().getTime() - new Date('12/08/2020')) / 1000 / 60 / 60 / 24 / 365 * 28).toFixed(2));

    [...document.querySelectorAll('.b-profile__text')]
        .find(node => node.innerText.toLowerCase().includes("накопилось"))
        .innerText += ` (${days})`;
};
