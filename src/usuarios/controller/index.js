const { UserService } = require("../services");

class UserControllers {
  static async apiGetUserbyUsername(req, res, next) {
    try {
      const user = await UserService.getUserbyUsername(req.params.username);
      res.json(user);
    } catch (error) {
      console.log(`Could not fetch user ${error}`);
    }
  }

  static async apiGetAllUsers(req, res, next) {
    try {
      const allUsers = await UserService.getAllUsers();
      res.json(allUsers);
    } catch (error) {
      console.log(`Could not fetch users ${error}`);
    }
  }

  static async apiCreateUser(req, res, next) {
    try {
      const id = await UserService.createUser(req.body);
      res.json(id);
    } catch (error) {
      console.log(`Could not create user ${error}`);
    }
  }

  static async apiLogin(req, res, next) {
    try {
      const user = await UserService.login(req.body);
      res.json(user);
    } catch (error) {
      console.log(`Could not login user ${error}`);
    }
  }

  static async apiUpdate(req, res, next) {
    try {
      const user = await UserService.update(req.body);
      res.json(user);
    } catch (error) {
      console.log(`Could not update user ${error}`);
    }
  }
}

module.exports = UserControllers;
