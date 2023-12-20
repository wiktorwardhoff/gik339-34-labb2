const express = require("express");

const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

const port = 3000;

server.listen(3000, () => console.log("Server running"));

server.get("/users", (req, res) => {
  const sqlite3 = require("sqlite3").verbose();

  const db = new sqlite3.Database("./gik339-labb2.db");

  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(rows);
    }

    db.close((err) => {
      if (err) {
        console.error(
          "Det gick inte att stänga databaskopplingen",
          err.message
        );
      } else {
        console.log("Databaskopplingen stängdes");
      }
    });
  });
});
