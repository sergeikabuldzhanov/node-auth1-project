const db = require("../data/db-config");

function get() {
  return db("user");
}

function getById(id) {
  return db("user")
    .where({ id })
    .first();
}

function getByUsername(username) {
  return db("user")
    .where({ username })
    .first();
}

function insert(credentials) {
  return db("user")
    .insert(credentials)
    .then(([id]) => getById(id));
}

module.exports = {
  get,
  getById,
  getByUsername,
  insert
};
