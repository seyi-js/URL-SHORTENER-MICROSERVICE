const amqp = require("amqplib");

const QUEUE = "shortUrl";

const rabbitSettings = require("../config/config").rabbit_mq_config;

async function connect() {
  const conn = await amqp.connect(rabbitSettings);
  const channel = await conn.createChannel();
  channel.assertQueue(QUEUE, {
    durable: true,
  });
  return channel;
}

module.exports.consumeQueue = async (callback) => {
  const ch = await connect();
  ch.consume(
    QUEUE,
    (msg) => {
      callback(msg);
    },
    { noAck: true }
  );
};
