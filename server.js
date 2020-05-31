require("dotenv");

const app = require("./app");

app.listen(process.env.PORT || 3000, () => {
  console.log("Na porta 3000");
});
