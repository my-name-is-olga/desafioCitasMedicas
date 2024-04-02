const express = require("express");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const chalk = require("chalk");
const _ = require("lodash");
const app = express();
const port = 3000;

function maleFemale(users) {
  const gender = _.groupBy(users, "gender");
  return gender;
}

axios
  .get("https://randomuser.me/api/?results=10")
  .then((response) => {
    const users = response.data.results;
    users.forEach((user, index) => {
      const firstName = user.name.first;
      const lastName = user.name.last;
      const id = uuidv4();
      const date = moment(user.registered.date).format(
        "MMMM Do YYYY, h:mm:ss a"
      );
      const usersGender = maleFemale(users);
      console.log("Hombres:");
      usersGender.male.forEach((user, index) => {
        console.log(
          chalk.blue.bgWhite.bold(
            index + 1,
            "Nombre:",
            user.name.first,
            "- Apellido:",
            user.name.last,
            "- ID:",
            id.slice(0, 6),
            "- Timestamp:",
            date
          )
        );
      });
      console.log("Mujeres:");
      usersGender.female.forEach((user, index) => {
        console.log(
          chalk.blue.bgWhite.bold(
            index + 1,
            "Nombre:",
            user.name.first,
            "- Apellido:",
            user.name.last,
            "- ID:",
            id.slice(0, 6),
            "- Timestamp:",
            date
          )
        );
      });
    });
  })
  .catch((error) => {
    console.log(chalk.red("Error:", error));
  });

app.listen(port, () => {
  console.log(`Servidor levantado en puerto ${3000}`);
});
