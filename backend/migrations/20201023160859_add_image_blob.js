exports.up = function (knex) {
  return knex.schema.alterTable('movies', (table) => {
    table.text('image');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('movies', (table) => {
    table.dropColumn('image');
  });
};
