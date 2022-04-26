module.exports = {
  db_config: {
    db: process.env.DB || "mongodb://localhost:27017/managementservice",
  },
  app_config: {
    redirection_url: process.env.REDIRECTION_APP_URL || "http://localhost:8001",
  },
  rabbit_mq_config: {
    protocol: "amqp",
    hostname: process.env.RABBITMQ_HOST || "localhost",
    port: process.env.RABBITMQ_PORT || 5672,
    username: "guest",
    password: "guest",
    virtualHost: "/",
  },
};
