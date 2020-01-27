
exports.up = function(knex) {
  return knex.schema.createTable('user', user_table=>{
      user_table.increments();
      user_table.text('username').notNullable().unique().comment('Username needs to be unique');
      user_table.text('password').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user');
};
