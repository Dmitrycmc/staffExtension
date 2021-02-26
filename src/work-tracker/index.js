import appendProgressBar from "./progress-bar-container";
import appendController from "./controller";

export const appendWorkTracker = () => {
    const parentNode = document.querySelector('.b-profile__head');

    appendController(parentNode);
    appendProgressBar(parentNode);
};
