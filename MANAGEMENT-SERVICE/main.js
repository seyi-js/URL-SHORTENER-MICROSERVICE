const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const morgan = require("morgan");
require("./config/db_config");
const { UrlModel } = require("./model");
const Hashids = require("hashids/cjs");
const hashids = new Hashids("hello world", 5);
const { publishToQueue } = require("./utils/mq.service");
app.use(express.json());

app.use(morgan("combined"));

//Routes

//Create URLS
app.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) throw new Error("Url is required.");

    const newUrl = await new UrlModel({
      realUrl: url,
      shortUrl: url,
    });

    await newUrl.save();
    const hash = hashids.encodeHex(newUrl._id.toString());
    const shortUrl = `${
      require("./config/config").app_config.redirection_url
    }/${hash}`;

    newUrl.shortUrl = shortUrl;
    newUrl.save();

    //publish to queue
    const data = {
      newUrl,
      hash,
    };
    await publishToQueue(data, "create-url");

    res.status(200).json(newUrl);
  } catch (error) {
    throw error;
  }
});

//DELETE URLS
app.delete("/:id", async (req, res) => {
  try {
    await UrlModel.findByIdAndDelete(req.params.id);

    //publish
    await publishToQueue(
      hashids.encodeHex(req.params.id.toString()),
      "delete-url"
    );
    res.status(200).json("Delete successful.");
  } catch (error) {
    throw error;
  }
});

app.listen(PORT, () =>
  console.log(`Management service started on port ${PORT}`)
);
