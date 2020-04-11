const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dns = require("dns");

const { isValidUrlFormat, getUrlHost } = require("./util/helpers");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

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

// Routes
app.get("/", (req, res) => {
  Url.find({})
    .then((urls) => console.log(urls, urls.length))
    .catch((e) => console.log(e));
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/shorturl/new", (req, res) => {
  const enteredUrl = req.body.url;
  if (!isValidUrlFormat(enteredUrl)) return res.json({ Error: "Invalid URL" });
  dns.lookup(getUrlHost(enteredUrl), async (err) => {
    try {
      if (!err) {
        const entries = await Url.find({});
        const numberOfEntries = entries.length;
        const postedUrl = await Url.find({ original_url: enteredUrl });
        if (postedUrl.length > 0) {
          const { original_url, short_url } = postedUrl[0];
          return res.json({ original_url, short_url });
        } else {
          const newEntry = {
            original_url: enteredUrl,
            short_url: numberOfEntries + 1,
          };
          await Url.create(newEntry);
          return res.json(newEntry);
        }
      } else {
        res.json({ error: "invalid Hostname" });
      }
    } catch (e) {
      res.redirect("/");
      console.err(e);
    }
  });
});

app.get("/api/shorturl/:shortUrl", async (req, res) => {
  const shortUrl = Number(req.params.shortUrl);
  const shortUrlRedirection = await Url.find({ short_url: shortUrl });
  if (shortUrlRedirection.length > 0) {
    res.redirect(shortUrlRedirection[0].original_url);
  } else {
    res.json({ error: "No short url found for given input" });
  }
});

app.listen(port, () => console.log(`Your app is listening on port ${port}`));
