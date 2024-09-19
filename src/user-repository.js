const config = require("./config");
const { User } = require("./usuarios/model/");
const jwt = require("jsonwebtoken");

class UserRepository {
  static async update({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    var user = await User.findOne({ username });
    if (!user) throw new Error("User not found");

    const token = jwt.sign({ username, password }, config.app.secret, {
      expiresIn: "1h",
    });
    console.log(token);

    await user.update({ token: token }).save();
    user = await User.findOne({ username });
    return user;
  }
}

module.exports = { UserRepository };
