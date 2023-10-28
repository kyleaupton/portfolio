import { library } from '@fortawesome/fontawesome-svg-core';

// Solid
import {
  faClockRotateLeft as faSolidClockRotateLeft,
  faStar as faSolidStar,
  faXmark as faSolidXmark,
} from '@fortawesome/free-solid-svg-icons';

// Regular
import {
  faEye as faRegEye,
  faStar as faRegStar,
} from '@fortawesome/free-regular-svg-icons';

library.add(
  // Solid
  faSolidClockRotateLeft,
  faSolidStar,
  faSolidXmark,

  // Regular
  faRegEye,
  faRegStar,
);
