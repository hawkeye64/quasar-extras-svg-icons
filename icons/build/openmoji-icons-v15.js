const packageName = 'openmoji';
const distName = 'openmoji-icons-v15';
const iconSetName = 'Openmoji Icons';
const prefix = 'om';
const iconPath = '';
const svgPath = '/**/*.svg';

// ------------

const tinyglobby = require('tinyglobby');
const { writeFileSync } = require('fs');
const { copySync } = require('fs-extra');
const { resolve, join } = require('path');

const start = new Date();

const skipped = [];
const distFolder = resolve(__dirname, `../${distName}`);
const { defaultNameMapper, extract, writeExports } = require('./utils');

const iconNames = new Set();

const svgExports = [];
const typeExports = [];

const openmojiJsonPath = resolve(__dirname, `../node_modules/${packageName}/data/openmoji.json`);
const openmojiJson = require(openmojiJsonPath);

const svgFolder = resolve(__dirname, `../node_modules/${packageName}/${iconPath}/`);

function findMatchingEmoji(json, key) {
  return json.find((obj) => obj.hexcode === key);
}

function removeAccents(str) {
  const accentsMap = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
    ü: 'u',
    Á: 'A',
    É: 'E',
    Í: 'I',
    Ó: 'O',
    Ú: 'U',
    Ü: 'U',
    ñ: 'n',
    Ñ: 'N',
    ç: 'c',
    Ç: 'C',
  };

  return str.replace(/[áéíóúüÁÉÍÓÚÜñÑçÇ]/g, (match) => accentsMap[match]);
}

const rCombining = /[\u0300-\u036F]/g;
const rControl = /[\u0000-\u001f]/g;

function filterName(baseName) {
  const match = findMatchingEmoji(openmojiJson, baseName);
  if (match) {
    baseName = match.annotation
      .normalize('NFKD') // Normalize to NFKD form
      .replace(rCombining, '') // Remove accents
      .replace(rControl, '-') // Replace control characters with '-'
      .replace(/[()&:’“”"!]/g, '') // Combine all single character replacements into one regex
      .replace(/Å/g, 'A')
      .replace(/#/g, 'Hash')
      .replace(/\*/g, 'Star')
      .replace(/,/g, '-')
      .replace(/ /g, '-')
      .replace(/le�n/g, 'Leon')
      .toLowerCase();
  }
  return { baseName, match };
}

const folders = [
  'color',
  // 'black'
];

// exclude anything that ended up as a box (didn't translate very well to a "black" icon)
const excludedSvg = [
  "'M5 17 H67 V55 H5 V17z@@fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2;|0 0 72 72'",
  "'M5.0834 17 H67.0834 V55 H5.0834 V17z@@fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2;|0 0 72 72'",
  "'M17 17 H55 V55 H17 V17z@@fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2;|0 0 72 72'",
  "'M67 17H5V55H67V17Z@@fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2;|0 0 72 72'",
  "'M67 17H5V55H67V17Z@@fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2;|0 0 72 72'",
  "'M59.0349,60h-46.07A.9679.9679,0,0,1,12,59.0349v-46.07A.9679.9679,0,0,1,12.9651,12h46.07A.9679.9679,0,0,1,60,12.9651v46.07A.9679.9679,0,0,1,59.0349,60Z@@fill:none;stroke:currentColor;stroke-linejoin:round;stroke-width:2;|0 0 72 72'",
];

for (const folder of folders) {
  function postFilters(svg) {
    svg = svg.replace(/M0 0z/g, 'M0 0z@@fill:none;stroke:none;&&');

    if (folder === 'black') {
      svg = svg
        .replace(/stroke:#000000;/g, 'stroke:currentColor;')
        .replace(/stroke:#000;/g, 'stroke:currentColor;')
        .replace(/fill:#000000;/g, 'fill:currentColor;')
        .replace(/fill:#000;/g, 'fill:currentColor;');
    }
    return svg;
  }

  const iconFolder = join(svgFolder, folder);

  // get root SVG
  const svgFiles = Array.from(new Set(tinyglobby.globSync(iconFolder + svgPath)));

  for (const file of svgFiles) {
    const pre = `${prefix}${folder === 'color' ? 'c' : ''}`;
    const { baseName /*, match*/ } = defaultNameMapper(file, pre, { filterName });

    let name = ((pre ? pre + '-' : '') + baseName)
      .replace(/_|%|\+|\./g, '-')
      .replace(/\s|-{2,}/g, '-')
      .replace(/(-\w)/g, (m) => m[1].toUpperCase());
    if (name.charAt(name.length - 1) === '-' || name.charAt(name.length - 1) === ' ') {
      name = name.slice(0, name.length - 1);
    }

    if (iconNames.has(name)) {
      // de-dupe duplicates
      let count = 1;
      while (iconNames.has(name + 'Alt' + count)) {
        count++;
      }
      name += 'Alt' + count;
    }

    if (folder === 'black') {
      // No inferred paths
      if (name === 'omFlagNepal') continue;
    }

    try {
      const { svgDef, typeDef } = extract(file, name, { postFilters });

      if (folder === 'black') {
        const match = svgDef.match(/'(.*?)'/g);
        // most 'black' flags or 'black' skin-tones squares have no content
        if (excludedSvg.includes(match[0])) {
          continue;
        }
      }

      svgExports.push(svgDef);
      typeExports.push(typeDef);

      iconNames.add(name);
    } catch (err) {
      console.error(`[Error] "${name}" could not be parsed:`, err.message);
      skipped.push(name);
    }
  }
}

writeExports(iconSetName, packageName, distFolder, svgExports, typeExports, skipped);

copySync(
  resolve(__dirname, `../node_modules/${packageName}/LICENSE.txt`),
  resolve(__dirname, `../${distName}/LICENSE.md`),
);

// write the JSON file
const file = resolve(__dirname, join('..', distName, 'icons.json'));
writeFileSync(file, JSON.stringify([...iconNames].sort(), null, 2), 'utf-8');

const end = new Date();

console.log(`${iconSetName} (count: ${iconNames.size}) done (${end - start}ms)`);

process.send && process.send({ distName, iconNames: [...iconNames], time: end - start });
