import { library } from '@fortawesome/fontawesome-svg-core';

// Solid
import {
  faClockRotateLeft as faSolidClockRotateLeft,
  faEnvelope as faSolidEnvelope,
  faIdCard as faSolidIdCard,
  faStar as faSolidStar,
  faXmark as faSolidXmark,
} from '@fortawesome/free-solid-svg-icons';

// Regular
import {
  faEye as faRegEye,
  faStar as faRegStar,
} from '@fortawesome/free-regular-svg-icons';

// Brands
import {
  faGithub,
  faLinkedin,
  faNpm,
} from '@fortawesome/free-brands-svg-icons';

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
  faNpm,
);
