var processApi = require('../lib/api')
var processUi = require('../lib/ui')
var program = require('commander')

program
  .version('0.0.1')
  .option('-a, --generatorApi', 'Generator Restful API')
  .option('-u, --generatorUi', 'Generator Antd UI')
  .parse(process.argv);
if (program.generatorApi) {
    processApi.processApi();
} else if (program.generatorUi) {
    processUi.processUi();
} else {
    processApi.processApi();
    processUi.processUi();
}

