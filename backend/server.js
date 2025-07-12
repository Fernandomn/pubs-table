const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const authMiddleware = require("./middleware/auth");

app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;
const DATA_DIR = path.join(__dirname, "data");
const sessions = {};

app.get("/api/classes", (req, res) => {
  const filePath = path.join(DATA_DIR, "class", "index.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data);
});

app.get("/api/login", (req, res) => {
  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "users", "users.json"))
  );
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(400).json({ error: "User not found." });
  }

  const token = uuid();
  sessions[token] = user.id;

  res.json({ token });
});

app.get("/api/characters", authMiddleware, (req, res) => {
  const chars = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "data", "characters", "characters.json")
    )
  );
  const userChars = chars.filter((c) => c.ownerId === req.userId);
  res.json(userChars);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
