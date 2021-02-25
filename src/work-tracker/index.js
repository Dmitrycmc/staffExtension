import {appendWorkTracker} from "./work-tracker";
import appendController from "./controller";

const parentNode = document.querySelector('.b-profile__head');

appendController(parentNode);
appendWorkTracker(parentNode);


