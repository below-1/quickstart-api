const bcrypt = require('bcrypt')

module.exports = async(fastify) => {
  const COLLECTION_NAME = 'users'

  fastify.post('/register', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'password', 'name', 'sex'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
          name: { type: 'string' },
          sex: { type: 'string', enum: ['male', 'female'] }
        }
      }
    },
    handler: async (request, reply) => {
      let payload = request.body
      payload.password = await bcrypt.hash(payload.password, 2)
      const collection = this.mongo.db.collection(COLLECTION_NAME)
      const result = await collection.insertOne(payload)
      reply.send({
        _id: result.insertId
      })
    }
  })

  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: {  type: 'string' }
        }
      }
    },
    handler: async (request, reply) => {
      const payload = request.body
      const collection = this.mongo.db.collection(COLLECTION_NAME)
      const userDoc = await collection.findOne({
        username: payload.username
      })
      const passwordMatch = await bcrypt.compare(payload.password, userDoc.password)
      if (!passwordMatch) {
        throw new Error(`Password not match`)
      }
      reply.send(userDoc)
    }
  })
}