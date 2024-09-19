const config = require("../../config");
const { User } = require("../model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class UserService {
  static async getUserbyUsername(username) {
    try {
      const user = await User.find({ username });
      return user;
    } catch (error) {
      console.log(`Could not fetch user ${error}`);
    }
  }

  static async getAllUsers() {
    try {
      const allUsers = await User.find();
      return allUsers;
    } catch (error) {
      console.log(`Could not fetch users ${error}`);
    }
  }

  static async createUser({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    try {
      const user = await User.findOne({ username });
      if (user) throw new Error("User already exists");

      const id = crypto.randomUUID();
      const hashPassword = await bcrypt.hash(password, config.app.salt_rounds);
      User.create({ _id: id, username, password: hashPassword }).save();

      return id;
    } catch (error) {
      console.log(`Could not create user ${error}`);
    }
  }

  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username });
    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid password");

    const { password: _, ...publicUser } = user;

    return publicUser;
  }

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

class Validation {
  static username(username) {
    if (typeof username !== "string") {
      throw new Error("Invalid username");
    }
    if (username.length < 4) {
      throw new Error("Username must be at least 4 characters long");
    }
  }
  static password(password) {
    if (typeof password !== "string") {
      throw new Error("Invalid password");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
  }
}

module.exports = { UserService };
