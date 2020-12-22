import "reflect-metadata";
import * as express from "express";
import { createPool } from "mysql";
import { createConnection, getConnection } from "typeorm";
import { Resume } from "./src/entity/Resume";
import { Education } from "./src/entity/Education";
import * as bodyParser from "body-parser";

const connection = createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "password",
  database: "resume_db",
});
createConnection("default");

connection.query("select 1 + 1", (err, rows) => {
  /* */
});
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/resume", function (req: any, res: any) {
  connection.getConnection(function (err, connection) {
    connection.query("SELECT * FROM resume", function (error, results, fields) {
      if (error) throw error && console.log(error.code);
      res.send(results);
    });
  });
});

app.get("/education/:id", function (req: any, res: any) {
  connection.getConnection(function (error, connection) {
    connection.query(
      "SELECT * FROM education where resumeId = ?",
      [req.params.id],
      function (error, results) {
        if (error) throw error && console.log(error.code);
        res.send(results);
      }
    );
  });
});

app.get("/resume/:uuid", function (req: any, res: any) {
  connection.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM resume where uuid = ?",
      [req.params.uuid],
      function (error, results) {
        if (error) throw error && console.log(error.code);
        res.send(results);
      }
    );
  });
});

app.post("/addResume", (req, res) => {
  const { name, phoneNumber, uuid } = req.body;

  let resRepository = getConnection("default").getRepository(Resume);

  resRepository.save({
    name: name,
    phoneNumber: phoneNumber,
    uuid: uuid,
  });
});

app.post("/updateResume", (req, res) => {
  const { name, phoneNumber, uuid } = req.body;

  let resRepository = getConnection("default").getRepository(Resume);

  resRepository.update(
    { uuid: uuid },
    {
      name: name,
      phoneNumber: phoneNumber,
    }
  );
});

app.post("/addEducation/:uuid", (req, res) => {
  const { degree, uuid } = req.body;

  let resRepository = getConnection("default").getRepository(Resume);
  resRepository.findOneOrFail({ uuid: req.params.uuid }).then((data) => {
    let eduRepository = getConnection("default").getRepository(Education);
    eduRepository.save({
      degree: degree,
      uuid: uuid,
      resumeId: data.id,
    });
  });
});

app.listen(5000, () => {
  console.log("Go to http://localhost:5000/resume so you can see the data.");
});
