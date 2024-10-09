/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
await knex.schema.createTable('users', function (table) {
  table.increments();
  table.string('name');
  table.string('email');
  table.string('hashed_password');
  table.timestamps();
});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   await knex.schema.dropTableIfExists('users');

};
