import "reflect-metadata";
import * as express from "express";
import { createPool } from "mysql";
import { createConnection, getConnection } from "typeorm";
import { Resume } from "./src/entity/Resume";
import { Education } from "./src/entity/Education";
import * as bodyParser from "body-parser";

const connection = createPool({
  host: "localhost",
  user: "fake",
  port: 3306,
  password: "pass123",
  database: "resume_db"
});

createConnection("ORM");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/resume", function(req: any, res: any) {
  connection.getConnection(function(err, connection) {
    connection.query("SELECT * FROM resume", function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
  });
});

app.get("/education", function(req: any, res: any) {
  connection.getConnection(function(err, connection) {
    connection.query("SELECT * FROM education", function(error, results) {
      if (error) throw error;
      res.send(results);
    });
  });
});

app.post("/addResume", (req, res) => {
  const { name, phoneNumber, id, uuid } = req.body;

  let resRepository = getConnection("ORM").getRepository(Resume);

  resRepository.save({
    id: id,
    name: name,
    phoneNumber: phoneNumber,
    uuid: uuid
  });
});

app.post("/addEducation", (req, res) => {
  const { degree, resumeId, uuid } = req.body;

  let resRepository = getConnection("ORM").getRepository(Resume);
  resRepository.findOneOrFail(resumeId);

  let eduRepository = getConnection("ORM").getRepository(Education);
  degree.forEach(async (item: string) => {
    await eduRepository.save({
      degree: item,
      uuid: uuid,
      resumeId: resumeId
    });
  });
});

// Starting our server.
app.listen(5000, () => {
  console.log("Go to http://localhost:5000/resume so you can see the data.");
});
