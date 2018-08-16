// Settings for SQL database.
const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';

const migrations = {
  directory: path.normalize(
    path.join(__dirname, 'resources', 'db', 'migrations')
  )
};

const seeds = {
  directory: path.normalize(
    path.join(__dirname, 'resources', 'db', 'seeds', NODE_ENV)
  )
};

module.exports.onUpdateTrigger = table => `
  CREATE TRIGGER ${table}_updated_at
  BEFORE UPDATE ON ${table}
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
`;

module.exports[NODE_ENV] = {
  client: 'pg',
  connection: {
    user: 'taton',
    database: 'nodemn_demo'
  },
  migrations,
  seeds
};
