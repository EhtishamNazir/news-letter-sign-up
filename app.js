const express = require("express");
// use to get form data
const bodyParser = require("body-parser"); 
const request = require("request");
const https = require("https");

const app = express();

// use to specify and access local file system 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName
				}
			}
		]
	}

	const jsonData = JSON.stringify(data);

	const url = "https://us20.api.mailchimp.com/3.0/lists/e91cf00a43";
	const options = {
		method: "POST",
		auth: "shani:eab8b6e23cf15e2ace18913858c3c76-us20"
	}

	const request = https.request(url, options, function (response) {
		if (response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		}
		else{
			res.sendFile(__dirname + "/failure.html");
		}
	});

	request.write(jsonData);
	request.end();


});

app.post("/failure", (req, res) => {
	res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
	console.log("Server is running on port: 3000");
});

// api key
// deab8b6e23cf15e2ace18913858c3c76-us20

// list id
// 