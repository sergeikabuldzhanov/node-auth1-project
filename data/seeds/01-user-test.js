const bcryptjs = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("user").insert([
        {
          username: "user1",
          password: bcryptjs.hashSync("test123", 11)
        },
        {
          username: "user2",
          password: bcryptjs.hashSync("test1234", 11)
        },
        {
          username: "user3",
          password: bcryptjs.hashSync("test12345", 11)
        }
      ]);
    });
};
