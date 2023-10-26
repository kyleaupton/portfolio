import { library } from '@fortawesome/fontawesome-svg-core';

// Solid
import {
  faClockRotateLeft as faSolidClockRotateLeft,
  faStar as faSolidStar,
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

  // Regular
  faRegEye,
  faRegStar,
);
