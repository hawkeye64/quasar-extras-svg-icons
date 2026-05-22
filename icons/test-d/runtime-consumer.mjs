import { createRequire } from "node:module";

import { akarAir } from "quasar-extras-svg-icons/akar-icons";
import { codiAccount } from "quasar-extras-svg-icons/codicons";

const require = createRequire(import.meta.url);
const { codiAccount: cjsCodiAccount } = require("quasar-extras-svg-icons/codicons");

for (const icon of [akarAir, codiAccount, cjsCodiAccount]) {
  if (typeof icon !== "string" || icon.length === 0) {
    throw new Error("Expected generated icon exports to be non-empty strings.");
  }
}
