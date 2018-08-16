exports.seed = async function(knex) {
  await knex('users').delete();
};
