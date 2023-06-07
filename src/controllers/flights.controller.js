const axios = require("axios");
const airportCodes = require("airport-codes");

const key = "647a3d73354d570c2b232801";

module.exports = {
  getFlightsPrice: async (req, res) => {
    try {
      let { source, destination, date } = req.body;

      const options = {
        method: "GET",
        url: "https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights",
        
        params: {
          sourceAirportCode: source,
          destinationAirportCode: destination,
          date: date,
          itineraryType: "ONE_WAY",
          sortOrder: "PRICE",
          numAdults: "1",
          numSeniors: "0",
          classOfService: "ECONOMY",
          pageNumber: "1",
          currencyCode: "INR",
        },
        headers: {
          "X-RapidAPI-Key":
            "94b97d5f67msh6de3d7165c73f69p1c7764jsne1aac72ea598",
          "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log("response:", response.data);
        const flights = response.data.data.flights;

       
       let result = []
        if (flights && flights.length > 0) {
          
          for(let i=0; i<flights.length; i++) {

            const displayName = flights[i].segments[0].legs[0].operatingCarrier.displayName;
            const totalPriceInUSD = flights[i].purchaseLinks[0].totalPrice;
            const totalPrice = totalPriceInUSD*82.5;
            
          
            // Printing the extracted values
            const arr = result.push(displayName,totalPrice)
           // console.log("displayName:", displayName);
            //console.log("totalPrice: USD", totalPrice);
          }
          console.log(result)
          
          
        } else {
          console.log("No flights found.");
        }
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving flight prices 1");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving flight prices 2");
    }
  },
};
