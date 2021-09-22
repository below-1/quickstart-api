if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const cors = require('fastify-cors')
const blipp = require('fastify-blipp')
const mongodb = require('fastify-mongodb')
const fastify = require('fastify')({
    logger: process.env.NODE_ENV == 'development'
})
const routes = require('./routes')

fastify.register(blipp)
fastify.register(cors)
fastify.register(mongodb, {
    forceClose: true,
    url: process.env.MONGODB_URL
})
fastify.register(routes)

fastify.listen(process.env.PORT, (err, address) => {
    if (err) {
        console.log(err)
        process.exit(1)
    }
    fastify.blipp()
    console.log(`listening at address: ${address}`)
})