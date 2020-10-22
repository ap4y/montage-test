exports.up = function (knex) {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.integer('year').notNullable();
    table.string('director');
    table.string('producer');
    table.string('screenwriter');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('movies');
};
