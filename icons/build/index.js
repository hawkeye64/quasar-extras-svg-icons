const parallel = require('os').cpus().length > 1
const run = parallel ? require('child_process').fork : require
const { join } = require('path')

function runJob (scriptFile) {
  run(join(__dirname, scriptFile))
}

runJob('./ant-design-icons.js')
runJob('./box-icons.js')
runJob('./codicons.js')
runJob('./cool-icons.js')
runJob('./entypo-icons.js')
runJob('./fluentui-system-icons.js')
runJob('./hero-icons-outline.js')
runJob('./hero-icons-solid.js')
runJob('./icomoon-free-icons.js')
runJob('./iconoir-icons.js')
runJob('./jam-icons.js')
runJob('./oct-icons.js')
runJob('./pixelart-icons.js')
runJob('./prime-icons.js')
runJob('./radix-ui-icons.js')
runJob('./remix-icons.js')
runJob('./simple-icons.js')
runJob('./system-uicons.js')
runJob('./teeny-icons.js')
runJob('./tabler-icons.js')
runJob('./unicons.js')
runJob('./vaadin-icons.js')
runJob('./zond-icons.js')
