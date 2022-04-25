const amqp = require("amqplib");

const QUEUE = "shortUrl";
const rabbitSettings = require("../config/config").rabbit_mq_config;

async function connect() {
  const conn = await amqp.connect(rabbitSettings);
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE);
  return channel;
}

module.exports.publishToQueue = async (data, type) => {
  const ch = await connect();
  ch.sendToQueue(QUEUE, Buffer.from(JSON.stringify(data)), { type });
};
