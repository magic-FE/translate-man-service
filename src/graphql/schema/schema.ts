import fs from 'fs'
import path from 'path'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './type'
import UserModel from '../../models/user'

UserModel.find((err, docs) => {
  if (err) throw err

  console.log(docs)
})

type Word = {
  word: string
  time: Date
}

export type User = {
  id: string
  name: string
  avatar: string
  history: [Word]
  notebook: [Word]
}

const resolvers = {
  Query: {
    user() {
      return {
        id: '1',
        name: 'cloudic',
        avatar: 'http://mongodb.github.io/node-mongodb-native/img/logo-mongodb-header.png',
        history: [{ word: 'a', time: new Date() }],
        notebook: [{ word: 'b', time: new Date() }],
      } as User
    }
  },

  User: {
    id({ id }: User) {
      return id
    },
    name({ name }: User) {
      return name
    },
    avatar({ avatar }: User) {
      return avatar
    },
    history({ history }: User) {
      return history
    },
    notebook({ notebook }: User) {
      return notebook
    }
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
