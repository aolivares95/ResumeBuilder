import * as express from "express";
import { createPool } from "mysql";
import { createConnection } from "typeorm";
import { Resume } from "./entity/Resume";
import * as UUID from "uuid";
import { Education } from "./entity/Education";

const connection = createPool({
  host: "localhost", // Your connection adress (localhost).
  user: "fake", // Your database's username.
  port: 3306,
  password: "pass123", // Your database's password.
  database: "resumedb" // Your database's name.
});

const app = express();

// Creating a GET route that returns data from the 'users' table.
app.get("/resume", function(req: any, res: any) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query("SELECT * FROM resume", function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
  });
});

app.get("/education", function(req: any, res: { send: (arg0: any) => void }) {
  // Connecting to the database.
  connection.getConnection(function(err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query("SELECT * FROM education", function(
      error,
      results,
      fields
    ) {
      // If some error occurs, we throw an error.
      if (error) throw error;
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
  });
});

// Starting our server.
app.listen(5000, () => {
  console.log("Go to http://localhost:5000/resume so you can see the data.");
});

export const saveResume = (name2: string, phoneNumber2: string) => {
  createConnection().then(async connection => {
    let resRepository = connection.getRepository(Resume);
    await resRepository.save({
      name: name2,
      phoneNumber: phoneNumber2,
      uuid: UUID.v4()
    });
  });
};

export const saveEducation = (degree2: string[], resumeUUID: string) => {
  createConnection().then(async connection => {
    let currentRes: Resume;
    let resRespository = await connection.getRepository(Resume);
    resRespository.findOneOrFail(resumeUUID).then(res => currentRes);

    let eduRepository = connection.getRepository(Education);
    degree2.forEach(async item => {
      await eduRepository.save({
        degree: item,
        uuid: UUID.v4(),
        resume: currentRes
      });
    });
  });
};
