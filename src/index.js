const express = require("express");
const config = require("./config");
const { UserService } = require("./usuarios/services");

const Usuarios = require("./usuarios/routes");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());

app.use("/", Usuarios);

// app.post("/update", async (req, res) => {
//   const { username, password } = req.body;

//   console.log(req.body);

//   try {
//     const id = await UserRepository.update({ username, password });
//     res.send({ id });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });
app.post("/logout", (req, res) => {});
app.get("/protected", (req, res) => {});

app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}`);
});
