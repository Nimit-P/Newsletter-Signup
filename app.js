//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

// serve static files from the 'public' directory
app.use(express.static("Public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/newsignup.html");
});

app.post("/", function(req, res) {

	const firstName = req.body.fname;
	const lastName = req.body.lname;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed", 
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	};

	data.update_existing = true;

	 const jsonData = JSON.stringify(data);

	 const url = "https://us21.api.mailchimp.com/3.0/lists/0b04662f39";

	 const options = {
	 	method: "POST",
	 	auth: "nimitprajapati:32f5cc90d8c4c96aaa84ca91d380e5ec-us21"
	 }

	const request = https.request(url, options, function(response) {

		if (response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		} else {
			res.sendFile(__dirname + "/success.html");
		}

//	 	response.on("data", function(data){
//	 		console.log(JSON.parse(data));
//	 	});

	 });

	request.write(jsonData);
	request.end();
	
});

app.post("/success", function (req, res) {
	res.redirect("/");
});


app.post("/failure", function (req, res) {
	res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
	console.log("Server is running on port 3000.");
});

//const PORT = process.env.PORT || 3000;
//app.listen(PORT, function ()  {
//	console.log("Server is running on port 3000");
//});

//API KEY
// 32f5cc90d8c4c96aaa84ca91d380e5ec-us21

//LIST ID
// 0b04662f39