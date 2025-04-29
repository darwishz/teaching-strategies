const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'teaching-strategies',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

