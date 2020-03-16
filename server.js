const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/shorturl", function(req, res) {
  res.send("hola");
});

app.listen(port, () => console.log(`Your app is listening on port ${port}`));

/*
A URL shortener works because of a Web server function called a “Redirect” (URL redirection). Basically the new URL (the short URL) will redirect users to the old URL (your long URL).  When you enter a URL a browser, this actually sends an HTTP command to the Web server directing it to fetch and transmit the requested Web page. There are a series of redirect HTTP response codes that a server can return, including the following:

I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response.
Example : {"original_url":"www.google.com","short_url":1}
If I pass an invalid URL that doesn't follow the http(s)://www.example.com(/more/routes) format, the JSON response will contain an error like {"error":"invalid URL"}
HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.
When I visit the shortened URL, it will redirect me to my original link.
*/