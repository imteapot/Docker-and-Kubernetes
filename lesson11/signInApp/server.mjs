import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "signIn.html"));
});

app.post("/login", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./DB/db.json"));

  const { username, password } = req.body;

  const foundUser = users.users.find((user) => user.userName === username);

  if (foundUser) {
    if (foundUser.password === password) {
      return res.sendFile(path.join(__dirname, "pages", "welcome.html"));
    }

    return res.send(`
      <script>
        alert('Incorrect password'); 
        window.location = '/'; 
      </script>
    `);
  }

  return res.send(`
    <script>
      alert('Incorrect username');
      window.location = '/'; 
    </script>
  `);
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync("./DB/db.json"));

  if (users.users.find((u) => u.userName === username)) {
    return res.send(`
      <script>  
        alert('Username already exists');
        window.location = '/signin';
      </script>
    `);
  }

  users.users.push({
    id: users.users.length + 1,
    userName: username,
    password,
  });

  fs.writeFileSync("./DB/db.json", JSON.stringify(users));

  return res.send(`
    <script>
       alert('User registered successfully!');
       window.location = '/'; 
    </script>
  `);
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
