const packageName = "@cds/core";
const distName = "clarity-icons-v6";
const iconSetName = "Clarity Icons";
const prefix = "clarity";
const iconPath = "/icon/shapes";
const svgPath = "/*.js";

const glob = require("glob");
const { writeFileSync } = require("fs");
const { copySync } = require("fs-extra");
const { resolve, join, basename } = require("path");

const start = new Date();

const skipped = [];
const distFolder = resolve(__dirname, `../${distName}`);
const { defaultNameMapper, extractSvg, writeExports } = require("./utils");

const svgFolder = resolve(
  __dirname,
  `../node_modules/${packageName}/${iconPath}/`
);
const svgFiles = glob.sync(svgFolder + svgPath);
const iconNames = new Set();

const svgExports = [];
const typeExports = [];

async function processFiles() {
  for (const file of svgFiles) {
    const jsFile = basename(file, ".js");
    let name = defaultNameMapper(jsFile, prefix);

    let accessor = name.slice(prefix.length);
    accessor = accessor.charAt(0).toLowerCase() + accessor.slice(1) + "Icon";

    const icons = await import(file);
    const items = icons[accessor][1];
    let svg;
    // 'clarityVmBugInverse' is the only one like this...
    if (typeof items === "string") {
      if (iconNames.has(name)) {
        continue;
      }

      svg = items;
      // why do some have surrounding svg tag and some don't?
      if (!svg.startsWith("<svg")) {
        svg =
          '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">' +
          svg +
          "</svg>";
      }

      try {
        // console.log(name, svg)
        const { svgDef, typeDef } = extractSvg(svg, name);
        svgExports.push(svgDef);
        typeExports.push(typeDef);

        iconNames.add(name);
      } catch (err) {
        console.error(err);
        skipped.push(name);
      }
    } else {
      const keys = Object.keys(items);
      for (const key of keys) {
        if (key.endsWith("Alerted") || key.endsWith("Badged")) continue;

        name = defaultNameMapper(`${jsFile}-${key}`, prefix);

        if (iconNames.has(name)) {
          continue;
        }

        let svg = items[key];
        // quite a few have this issue
        // also height="5"" <- notice two double quotes on end, which breaks dom parser
        svg = svg
          .replace('</g><g id="Layer_5" data-name="Layer 5">', "")
          .replace('""', '"');

        // why do some have surrounding svg tag and some don't?
        if (!svg.startsWith("<svg")) {
          svg =
            '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">' +
            svg +
            "</svg>";
        }

        try {
          // console.log(name, svg)
          const { svgDef, typeDef } = extractSvg(svg, name);
          svgExports.push(svgDef);
          typeExports.push(typeDef);

          iconNames.add(name);
        } catch (err) {
          console.error(err);
          skipped.push(name);
        }
      }
    }
  }
}

async function run() {
  await processFiles();

  writeExports(
    iconSetName,
    packageName,
    distFolder,
    svgExports,
    typeExports,
    skipped
  );

  // copySync(
  //   resolve(__dirname, `../node_modules/${packageName}/LICENSE`),
  //   resolve(__dirname, `../${distName}/LICENSE.md`)
  // )

  // write the JSON file
  const file = resolve(__dirname, join("..", distName, "icons.json"));
  writeFileSync(file, JSON.stringify([...iconNames].sort(), null, 2), "utf-8");

  const end = new Date();

  console.log(
    `${iconSetName} (count: ${iconNames.size}) done (${end - start}ms)`
  );

  process.send &&
    process.send({ distName, iconNames: [...iconNames], time: end - start });
}

run();
