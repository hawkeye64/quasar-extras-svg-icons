const { writeFileSync } = require("fs");
const { fork } = require("child_process");
const { cpus } = require("os");
const { resolve, join } = require("path");
const { Queue, sleep, retry } = require("./utils");

const parallel = cpus().length > 1;
const maxJobCount = cpus().length - 1 || 1;
const iconScripts = [
  "akar-icons",
  "ant-design-icons",
  "box-icons",
  "brand-icons",
  "brandico-icons",
  "bytesize-icons",
  "carbon-icons-v11",
  "carbon-pictograms-v12",
  "clarity-icons-v6",
  "codicons",
  "cool-icons-v4",
  "coreui-icons-v3",
  "country-flag-icons",
  "dashicons",
  "drip-icons",
  "dev-icons",
  "elusive-icons",
  "entypo-icons",
  "evil-icons",
  "feather-icons",
  "flat-color-icons",
  "flatui-icons",
  "fluentui-system-icons",
  "fontisto-icons",
  "foundation-icons",
  "geom-icons",
  "gitlab-icons-v3",
  "glyphs-brands",
  "glyphs-core-icons",
  "grid-icons",
  "health-icons-v2",
  "hero-icons-v2",
  "icomoon-free-icons",
  "iconoir-icons-v7",
  "iconpark-icons",
  "ikonate",
  "ikons",
  "jam-icons",
  "keyrune-icons",
  "linear-icons",
  "linecons",
  "maki-icons-v8",
  "map-icons",
  "material-icon-theme-v5",
  "material-line-icons-v2",
  "modern-icons",
  "oct-icons-v19",
  "open-iconic",
  "openmoji-icons-v15",
  "phosphor-icons-v2",
  "pixelart-icons",
  "polaris-icons-v9",
  "prime-icons-v7",
  "radix-ui-icons",
  "remix-icons-v4",
  "simple-icons-v13",
  "simple-line-icons",
  "stroke7-icons",
  "subway-icons",
  "system-uicons",
  "tabler-icons-v3",
  "teeny-icons",
  "typ-icons",
  "uiw-icons",
  "unicons",
  "vaadin-icons-v24",
  "weather-icons",
  "webfont-medical-icons",
  "windows-icons",
  "zond-icons",
];

async function generate() {
  const startTime = Date.now();
  let totalIcons = 0;
  let totalBuildTime = 0;

  const queue = new Queue(
    async (scriptFile) => {
      await retry(async ({ tries }) => {
        await sleep((tries - 1) * 100);
        const child = fork(join(__dirname, `${scriptFile}.js`));

        await new Promise((resolve, reject) => {
          child.on("message", (message) => {
            totalIcons += message.iconNames.length;
            totalBuildTime += message.time;
          });
          child.on("exit", (code) => {
            if (code === 0) {
              resolve();
            } else {
              reject(
                new Error(`Script ${scriptFile} failed with code ${code}`)
              );
            }
          });
        });
      });
    },
    { concurrency: maxJobCount }
  );

  // Enqueue all jobs
  for (const script of iconScripts) {
    if (parallel) {
      queue.push(script);
    } else {
      await retry(async ({ tries }) => {
        await sleep((tries - 1) * 100);
        const child = require(join(__dirname, `${script}.js`));
        // Simulate message event for inline requires
        totalIcons += child.iconNames.length;
        totalBuildTime += child.time;
      });
    }
  }

  // Wait for all jobs to complete
  await queue.wait({ empty: true });

  // Run the export builder
  await retry(async ({ tries }) => {
    await sleep((tries - 1) * 100);
    const buildChild = fork(join(__dirname, "./utils/buildExports.js"));
    await new Promise((resolve, reject) => {
      buildChild.on("exit", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Build exports failed with code ${code}`));
        }
      });
    });
  });

  // Ensure everything is completed before logging totals
  const endTime = Date.now();
  console.log(`Total Run Time: ${endTime - startTime}ms`);
  console.log(`Total Build Time: ${totalBuildTime}ms`);
  console.log(`Total Saved Time: ${totalBuildTime - (endTime - startTime)}ms`);
  console.log(`Total Icons Built: ${totalIcons}`);
}

generate().catch((err) => console.error(err));
