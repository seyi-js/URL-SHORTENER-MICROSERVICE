const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    realUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

exports.UrlModel = mongoose.model("urls", UrlSchema);
