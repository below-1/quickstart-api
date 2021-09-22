const ObjectID = require('mongodb').ObjectID

module.exports = async(fastify) => {

  const COLLECTION_NAME = 'alternatif'

  fastify.get('/', {
    handler: async function(request, reply) {
      const collection = this.mongo.db.collection(COLLECTION_NAME)
      const items = await collection.find({}).toArray()
      console.log(items)
      reply.send({
        items,
        totalData: 1000,
        totalPage: 10
      })
    }
  })

  fastify.get('/:id', {
    handler: async function(request, reply)  {
      const collection = this.mongo.db.collection(COLLECTION_NAME)
      const result = await collection.findOne({
        _id: new ObjectID(request.params.id)
      })
      reply.send(result)
    }
  })

  fastify.post('/', {
    handler: async function(request, reply) {
      const collection = this.mongo.db.collection(COLLECTION_NAME)
      const payload = request.body
      const result = await collection.insertOne(payload)
      reply.send({
        _id: result.insertedId
      })
    }
  })

  fastify.put('/:id', {
    handler: async function(request, reply) {
      const _id = new ObjectID(request.params.id)
      const collection = this.mongo.db.collection(COLLECTION_NAME)
      const payload = request.body
      const updateResult = await collection.updateOne({ _id }, {
        $set: payload
      })
      reply.send({
        modifiedCount: updateResult.modifiedCount
      })
    }
  })

  fastify.delete('/:id', {
    handler: async function(request, reply) {
      const _id = new ObjectID(request.params.id)
      const collection = this.mongo.db.collection(COLLECTION_NAME)
      const deleteResult = await collection.deleteOne({ _id })
      reply.send({
        count: deleteResult.deletedCount
      })
    }
  })

}