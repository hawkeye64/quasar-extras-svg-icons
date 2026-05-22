import { akarAir } from "quasar-extras-svg-icons/akar-icons";
import { codiAccount } from "quasar-extras-svg-icons/codicons";
import { tabFilledAccessible } from "quasar-extras-svg-icons/tabler-icons-v3";

const icons: string[] = [akarAir, codiAccount, tabFilledAccessible];

icons.forEach((icon) => {
  if (icon.length === 0) {
    throw new Error("Icon export should not be empty.");
  }
});
