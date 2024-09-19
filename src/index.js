const express = require("express");
const config = require("./config");
const { UserService } = require("./usuarios/services");

const Usuarios = require("./usuarios/routes");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", Usuarios);

app.get("/login", (req, res) => {
  res.send(`<html>
    <head>
    <title>Login</title>
    </head>
    <body>
    <form method="POST" action="/create">
    Nombre Usuario: <input type="text" name="username" placeholder="username" /></br>
    Contraseña: <input type="password" name="password" placeholder="password" /></br>
    <button type="submit">Create</button>
    </form>
    </body>
    </html>`);
});

app.post("/logout", (req, res) => {});
app.get("/protected", (req, res) => {});

app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}`);
});
