import { createRequire } from "node:module";

import { akarAir } from "quasar-extras-svg-icons/akar-icons";
import { codiAccount } from "quasar-extras-svg-icons/codicons";
import { lnrAlarm } from "quasar-extras-svg-icons/linear-icons";

const require = createRequire(import.meta.url);
const { codiAccount: cjsCodiAccount } = require("quasar-extras-svg-icons/codicons");

for (const icon of [akarAir, codiAccount, cjsCodiAccount, lnrAlarm]) {
  if (typeof icon !== "string" || icon.length === 0) {
    throw new Error("Expected generated icon exports to be non-empty strings.");
  }
}

if (lnrAlarm.includes("#000000") || !lnrAlarm.includes("currentColor")) {
  throw new Error("Expected Linear Icons exports to use currentColor.");
}
