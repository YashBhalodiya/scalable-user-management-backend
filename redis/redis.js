const Redis = require("ioredis")

const redisInstance = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379
})

redisInstance.on('connect', ()=> {
    console.log("Redis Connected");
})

redisInstance.on('error', (error) => console.log(error))

module.exports = redisInstance