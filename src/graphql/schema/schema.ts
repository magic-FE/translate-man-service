import fs from 'fs'
import path from 'path'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './type'
import UserModel, { User } from '../../models/user'

const resolvers = {
  Query: {
    getUser(_:any, { token }: User) {

    }
  },

  Mutation: {
    login: async (_:any, { email, password }: User) => {
      try {
        return { email: 'xx' }
      } catch(e) {

      }
    },
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
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
