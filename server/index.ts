import "reflect-metadata";
import * as express from "express";
import { createPool } from "mysql";
import { createConnection } from "typeorm";
import { Resume } from "./src/entity/Resume";
import * as UUID from "uuid";
import { Education } from "./src/entity/Education";
import * as bodyParser from "body-parser";

const connection = createPool({
  host: "localhost", // Your connection adress (localhost).
  user: "fake", // Your database's username.
  port: 3306,
  password: "pass123", // Your database's password.
  database: "resume_db" // Your database's name.
});

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
  const { name, phoneNumber } = req.body;
  console.log("Resume saved **********:" + JSON.stringify(req.body));
  createConnection().then(async connection => {
    let resRepository = connection.getRepository(Resume);
    await resRepository.save({
      name: name,
      phoneNumber: phoneNumber,
      uuid: UUID.v4()
    });
  });
});

app.post("/addEducation", (req, res) => {
  createConnection().then(async connection => {
    const { degree, resumeId } = req.body;

    let resRespository = await connection.getRepository(Resume);
    resRespository.findOneOrFail(resumeId);

    let eduRepository = connection.getRepository(Education);
    degree.forEach(async (item: string) => {
      await eduRepository.save({
        degree: item,
        uuid: UUID.v4(),
        resumeId: resumeId
      });
    });
  });
});

// Starting our server.
app.listen(5000, () => {
  console.log("Go to http://localhost:5000/resume so you can see the data.");
});
