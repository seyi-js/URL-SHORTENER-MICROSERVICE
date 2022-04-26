const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;

const { consumeQueue } = require("./utils/mq.service");
const { createClient } = require("redis");

const client = createClient({
  socket: require("./config/config").redis_config,
});

const APP_URL = require("./config/config").app_config.app_url;

client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

const manageMessage = async (msg) => {
  const type = msg.properties.type;
  const parsedMessage = JSON.parse(msg.content);

  if (type === "create-url") {
    await client.hSet(parsedMessage.hash, {
      id: parsedMessage.newUrl._id,
      realUrl: parsedMessage.newUrl.realUrl,
    });
  }
  if (type === "delete-url") {
    await client.del(parsedMessage);
  }
};

consumeQueue(manageMessage);

app.get("/:hash", async (req, res) => {
  const hash = req.params.hash;
  const keyHash = await client.hGetAll(hash);
  if (Object.keys(keyHash).length === 0)
    return res.status(404).json(`URL does not exist: ${APP_URL}/${hash}`);

  return res.redirect(keyHash.realUrl);
});

app.listen(PORT, () =>
  console.log(`Redirection service started on port ${PORT}`)
);
