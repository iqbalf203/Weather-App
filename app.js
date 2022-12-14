const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

    app.post("/", function(req, res){
        const city = req.body.cityName;

        const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&id=524901&units=metric&appid=579e6590ed8191070c5e08eddf2a6988"
        https.get(url, function(response){
            console.log(response.statusCode);
    
            response.on("data", function(data){
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                
                const imgURL = "https://tinyurl.com/2nc39k8u";
                res.write("<body style='background-color:#9ec7cd;'><h1 style='margin-top:10rem;'><center>The temperature in " + city + " is " + temp + " degrees Celcius.</h1>");
                res.write("<center><p style='font-size:1.5rem;'>The weather currently is " + weatherDescription + ".</p>");
                res.write("<center><img src =" +imageURL+ " style='width:16rem;'></center>");
                res.send();


})
        })
    })

})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port 3000.")
})