import "reflect-metadata";
import * as express from "express";
import { createPool } from "mysql";
import { createConnection, getConnection } from "typeorm";
import { Resume } from "./src/entity/Resume";
import { Education } from "./src/entity/Education";
import * as bodyParser from "body-parser";

const connection = createPool({
  host: "localhost", // Your connection adress (localhost).
  user: "fake", // Your database's username.
  port: 3306,
  password: "pass123", // Your database's password.
  database: "resume_db" // Your database's name.
});

createConnection("ORM");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/resume", function(req: any, res: any) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    // Executing the MySQL query.
    connection.query("SELECT * FROM resume", function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
  });
});

app.get("/education", function(req: any, res: any) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query("SELECT * FROM education", function(error, results) {
      // If some error occurs, we throw an error.
      if (error) throw error;
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
  });
});

app.post("/addResume", (req, res) => {
  console.log("REQ BODY**********:" + req.body);
  const { name, phoneNumber, id, uuid } = req.body;
  console.log("Resume saved **********:" + JSON.stringify(req.body));

  let resRepository = getConnection("ORM").getRepository(Resume);
  if (id) {
    resRepository.save({
      id: id,
      name: name,
      phoneNumber: phoneNumber,
      uuid: uuid
    });
  } else {
    resRepository.save({
      name: name,
      phoneNumber: phoneNumber,
      uuid: uuid
    });
  }
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
