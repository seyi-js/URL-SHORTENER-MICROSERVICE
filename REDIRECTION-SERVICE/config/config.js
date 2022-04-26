module.exports = {
  app_config: {
    app_url: process.env.APP_URL || "http://localhost:8001",
  },
  rabbit_mq_config: {
    protocol: "amqp",
    hostname: process.env.RABBITMQ_HOST || "localhost",
    port: process.env.RABBITMQ_PORT || 5672,
    username: "guest",
    password: "guest",
    virtualHost: "/",
  },
  redis_config: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || "redis-store",
  },
};
