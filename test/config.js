const path = require('path');

module.exports = bedrock => {
  const config = bedrock.config;
  if(!config.protractor) {
    return;
  }
  const protractor = config.protractor.config;
  const prepare =
    path.join(__dirname, 'protractor', 'prepare.js');
  protractor.params.config.onPrepare.push(prepare);
};
