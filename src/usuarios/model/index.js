const dbLocal = require("db-local");

const { Schema } = new dbLocal({ path: "./db" });

const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: false },
});

module.exports = { User };
