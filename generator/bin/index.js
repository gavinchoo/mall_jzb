var processApi = require('../lib/api')
var processUi = require('../lib/ui')
var program = require('commander')

program
  .version('0.0.1')
  .option('-a, --api', 'Generator Restful API')
  .option('-u, --ui', 'Generator Antd UI')
  .option('-m, --menu', 'Generator Antd Menu')
  .parse(process.argv);
if (program.api) {
    processApi.processApi();
} else if (program.ui) {
    processUi.processUi();
} else if (program.menu) {
    processUi.processMenu();
} else {
    processApi.processApi();
    processUi.processUi();
    processUi.processMenu();
}

