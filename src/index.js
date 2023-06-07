const express = require("express");

//routes
const flightRoutes = require("./routes/flights.route");
const { getFlightsPrice } =require("./controllers/flights.controller");
/*
 source ar destination dalne pe flight name aur uska price aana chahiye
curl --location --request GET 'http://localhost:8000/getflights' \
--header 'Content-Type: application/json' \
--data '{
  "source": "DEL",
  "destination": "PAT",
  "date": "2023-07-10"
}'
*/
// init express app
const app = express();

//middlewares
app.use(express.json());

const PORT=8000;

app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
  });
});

app.use("/getflights", getFlightsPrice);

async function main() {
  try {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
