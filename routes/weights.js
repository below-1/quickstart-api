module.exports = async(fastify) => {
  const COLLECTION_NAME = 'settings'

  fastify.get('/', {
    handler: async function(request, reply) {
      const collection = this.mongo.db.collection(COLLECTION_NAME)
      const item = await collection.findOne({
        type: 'weights'
      })
      if (!item) {
        reply.status(404).end()
      } else {
        reply.send(item)
      }
    }
  })

  fastify.post('/', {
    handler: async function (request, reply) {
      const collection = this.mongo.db.collection(COLLECTION_NAME)
      const deleteResult = await collection.deleteOne({
        type: 'weights'
      })
      const payload = {
        type: 'weights',
        ...request.body
      }
      const result = await collection.insertOne(payload)
      reply.send({
        _id: result.insertedId
      })
    }
  })
}