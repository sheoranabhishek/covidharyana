const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", (req, res) => {

    var url = "https://api.covid19india.org/data.json";

    request(url, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            parsedCityDetails = JSON.parse(body);
            res.render("home.ejs", { Data: parsedCityDetails });
        } else {
            console.log(err);
        }
    })
})



app.get("/district", (req, res) => {

    var url = "https://api.covid19india.org/state_district_wise.json";

    request(url, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            parsedCityDetails = JSON.parse(body);
            res.render("district.ejs", { Data: parsedCityDetails.Haryana });

        } else {
            console.log(err);
        }
    })
});





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Listening to 3000");
});