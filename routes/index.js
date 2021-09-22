module.exports = async(fastify) => {
    fastify.register(require('./alternatif'), {
        prefix: '/v1/api/spots'
    })
    fastify.register(require('./auth'), {
      prefix: '/v1/auth'
    })
    fastify.register(require('./session'), {
      prefix: '/v1/api/session'
    })
    fastify.register(require('./weights'), {
      prefix: '/v1/api/weights'
    })
}