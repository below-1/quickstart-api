module.exports = async(fastify) => {

  const COLLECTION_NAME = 'session'

  fastify.get('/', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          userId: { type: 'integer' },
          page: { type: 'integer', default: 0 },
          perPage: { type: 'integer', default: 10 }
        }
      }
    },
    handler: async (request, reply) => {
      const collection = this.mongo.db.collection(COLLECTION_NAME)
      const options = request.query
      const { userId } = options

      let conditions = {}

      if (userId) {
        conditions.userId = userId
      }
      const findResults = await collection.find(conditions, {
        skip: options.perPage * options.page,
        limit: options.perPage
      })
      return findResults.toArray()
    }
  })

  fastify.post('/', {
    schema: {
      body: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          answers: { type: 'array' },
          results: { type: 'array' }
        }
      }
    },
    handler: async (request, reply) => {

    }
  })

}
