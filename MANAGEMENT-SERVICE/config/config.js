module.exports = {
  db_config: {
    db:
      process.env.NODE_ENV !== "production"
        ? "mongodb://localhost:27017/managementservice"
        : "",
  },
  app_config: {
    app_url: process.env.NODE_ENV !== "production" ? "http://localhost" : "",
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
