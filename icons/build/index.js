const parallel = require('os').cpus().length > 1
const run = parallel ? require('child_process').fork : require
const { join } = require('path')

function runJob (scriptFile) {
  run(join(__dirname, scriptFile))
}

runJob('./box-icons.js')
runJob('./fluentui-system-icons.js')
runJob('./hero-icons-outline.js')
runJob('./hero-icons-solid.js')
runJob('./iconoir-icons.js')
runJob('./jam-icons.js')
runJob('./oct-icons.js')
runJob('./pixelart-icons.js')
runJob('./prime-icons.js')
runJob('./remix-icons.js')
runJob('./simple-icons.js')
runJob('./teeny-icons.js')
runJob('./tabler-icons.js')
runJob('./unicons.js')
runJob('./zond-icons.js')
