const app = require("./app");
const dbConnect = require("./utils/db");
const config = require("./config.json");
// connect to the database
dbConnect();
const PORT = process.env.PORT || config.PORT;
app.listen(config.PORT, () => {
  console.log(`App is running on port 3001`);
});
