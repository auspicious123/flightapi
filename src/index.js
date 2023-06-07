const express = require("express");

//routes
const flightRoutes = require("./routes/flights.route");
// const { getFlightsPrice } =require("./controllers/flights.controller");

// init express app
const app = express();

//middlewares
app.use(express.json());

// const PORT=8000;
const { PORT } = require("./config");

app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
  });
});

app.use("/flights", flightRoutes);

async function main() {
  try {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
