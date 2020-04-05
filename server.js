const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

const urlValidityCheckerr = (url) =>
  dns.lookup(url, (err, address) =>
    err
      ? { error: console.log("invalid URL") }
      : console.log(`${address} is valid`)
  );

urlValidityCheckerr("google.com");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));

// Schema
const Url = mongoose.model("Url", {
  original_url: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  short_url: {
    type: Number,
  },
});

// We create an instance of it
const firstUrl = new Url({ original_url: "www.google.com", short_url: 1 });

// And saving the instance on the db
app.get("/", (req, res) => {
  // firstUrl
  //   .save()
  //   .then(() => {
  //     console.log(firstUrl);
  //   })
  //   .catch((err) => {
  //     console.log("Error: ", err);
  //   });
  Url.find({})
    .then((urls) => console.log(urls))
    .catch((e) => console.log(e));
  res.sendFile(__dirname + "/views/index.html");
});

/*


// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/reader", (req, res) => {
  Url.find({}, (err, urls) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { urls });
    }
  });
});

app.get("/api/shorturl", (req, res) => {
  // redirects to the values it has
  res.send("hola");
});

app.post("/api/shorturl/new", (req, res) => {
  // create a new url or read a current one
  Url.create(req.body.url, (err, newUrl) => {
    if (err) {
      res.send("ERRROORROROORORORORORORO");
    } else {
      // then, redirect to the index
      res.redirect("/api");
    }
  });
});
*/

app.listen(port, () => console.log(`Your app is listening on port ${port}`));

/*
A URL shortener works because of a Web server function called a “Redirect” (URL redirection). Basically the new URL (the short URL) will redirect users to the old URL (your long URL).  When you enter a URL a browser, this actually sends an HTTP command to the Web server directing it to fetch and transmit the requested Web page.

When I receive a url
  I check if it's a valid URL
    If it is 
      I check if I have it, if I do, I return the value for it.
      If i don't I save it into my db and return the value for it/
    If it's not throw an error

I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response.
Example : {"original_url":"www.google.com","short_url":1}
If I pass an invalid URL that doesn't follow the http(s)://www.example.com(/more/routes) format, the JSON response will contain an error like {"error":"invalid URL"}
HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.
When I visit the shortened URL, it will redirect me to my original link.
*/
