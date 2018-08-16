const { onUpdateTrigger } = require('../../../knexfile');

exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.integer('CharacterID');
    table.string('CharacterName');
    table.timestamps(true, true);
  });
  await knex.raw(onUpdateTrigger('users'));
};

exports.down = async function(knex) {
  await knex.schema.dropTable('users');
};
