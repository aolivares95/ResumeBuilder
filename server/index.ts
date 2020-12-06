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
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/resume", function (req: any, res: any) {
  connection.getConnection(function (err, connection) {
    connection.query("SELECT * FROM resume", function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
  });
});

app.get("/education/:id", function (req: any, res: any) {
  connection.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM education where resumeId = ?",
      [req.params.id],
      function (error, results) {
        if (error) throw error;
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
  const { name, phoneNumber, id } = req.body;

  let resRepository = getConnection("default").getRepository(Resume);

  resRepository.update(id, {
    name: name,
    phoneNumber: phoneNumber,
  });
});

app.post("/addEducation", (req, res) => {
  const { degree, resumeId, uuid } = req.body;

  let resRepository = getConnection("default").getRepository(Resume);
  resRepository.findOneOrFail(resumeId);

  let eduRepository = getConnection("default").getRepository(Education);

  eduRepository.save({
    degree: degree,
    uuid: uuid,
    resumeId: resumeId,
  });
});

// Starting our server.
app.listen(5000, () => {
  console.log("Go to http://localhost:5000/resume so you can see the data.");
});
