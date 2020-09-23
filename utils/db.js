// database connection here
const mongoose = require("mongoose");
const config = require("../config.json");

const dbConnect = () => {
  const url = config.dbUrl;
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("System connected to the database"))
    .catch((e) => console.error(e));
};
module.exports = dbConnect;
