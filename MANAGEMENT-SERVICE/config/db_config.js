const mongoose = require("mongoose");
mongoose.set("sanitizeFilter", true);

let db = require("./config").db_config.db;
(async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Connected to Management service DB.");
  } catch (error) {
    throw error;
  }
})();
