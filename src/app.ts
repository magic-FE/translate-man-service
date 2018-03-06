import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import schema from './graphql/schema/schema'

// 从 .env 文件加载环境变量 包括数据库地址，用户名，密码等
dotenv.config()

const mongoUrl = `mongodb://${process.env.MONGOURL}`

mongoose.connect(mongoUrl, {
  user: process.env.MONGOUSER,
  pass: process.env.MONGOPASS,
}).then(() => {
  console.log('MongoDB connection successed.')
}).catch(err => {
  console.error('MongoDB connection error. Please make sure MongoDB is running.', err)
})

const app = new Koa()

const router = new Router()
router.all('/graphql', graphqlKoa({ schema }))
router.get('/graphiql', graphiqlKoa({
  endpointURL: '/graphql',
}))

app.use(bodyParser({ enableTypes: ['json'] }))
app.use(router.routes())
app.use(router.allowedMethods())

export default app
