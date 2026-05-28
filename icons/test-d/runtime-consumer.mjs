import { akarAir } from "quasar-extras-svg-icons/akar-icons";
import { codiAccount } from "quasar-extras-svg-icons/codicons";
import { lnrAlarm } from "quasar-extras-svg-icons/linear-icons";

for (const icon of [akarAir, codiAccount, lnrAlarm]) {
  if (typeof icon !== "string" || icon.length === 0) {
    throw new Error("Expected generated icon exports to be non-empty strings.");
  }
}

if (lnrAlarm.includes("#000000") || !lnrAlarm.includes("currentColor")) {
  throw new Error("Expected Linear Icons exports to use currentColor.");
}
