// For Nuxt 3
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Solid
import {
  faClockRotateLeft as faSolidClockRotateLeft,
  faEnvelope as faSolidEnvelope,
  faIdCard as faSolidIdCard,
  faStar as faSolidStar,
  faXmark as faSolidXmark,
} from "@fortawesome/free-solid-svg-icons";

// Regular
import {
  faEye as faRegEye,
  faStar as faRegStar,
} from "@fortawesome/free-regular-svg-icons";

// Brands
import {
  faGithub,
  faLinkedin,
  faNpm,
} from "@fortawesome/free-brands-svg-icons";

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

library.add(
  // Solid
  faSolidClockRotateLeft,
  faSolidEnvelope,
  faSolidIdCard,

  faSolidStar,
  faSolidXmark,

  // Regular
  faRegEye,
  faRegStar,

  // Brands
  faGithub,
  faLinkedin,
  faNpm
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("fa-icon", FontAwesomeIcon, {});
});
