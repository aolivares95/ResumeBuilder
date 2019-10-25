import "reflect-metadata";
import { createConnection } from "typeorm";
import { Resume } from "./entity/Resume";

createConnection()
  .then(async connection => {
    console.log("Inserting a new user into the database...");
    const res1 = new Resume();
    res1.name = "Timber";
    res1.phoneNumber = "Saw";
    res1.educationIds = "25";
    await connection.manager.save(res1);
    console.log("Saved a new res with id: " + res1.id);
    console.log("Loading ress from the database...");
    const resumes = await connection.manager.find(Resume);
    console.log("Loaded resumes: ", resumes);
  })
  .catch(error => console.log(error));
