const fs = require('fs')
const path = require('path')
const { makeExecutableSchema } = require('graphql-tools')

// 从 type.gql 读取类型
const typeDefs = fs.readFileSync(path.join(__dirname, 'type.gql'), { encoding: 'utf-8' })

const resolvers = {
  Query: {
    user() {
      return {
        id: '1',
        name: 'cloudic',
        avatar: 'http://mongodb.github.io/node-mongodb-native/img/logo-mongodb-header.png',
        history: [{ word: 'a', time: new Date().getTime() }],
        notebook: [{ word: 'b', time: new Date().getTime() }],
      }
    }
  },

  User: {
    id({ id }) {
      return id
    },
    name({ name }) {
      return name
    },
    avatar({ avatar }) {
      return avatar
    },
    history({ history }) {
      return history
    },
    notebook({ notebook }) {
      return notebook
    }
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
