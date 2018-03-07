import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import jwt from 'koa-jwt'
import mongoose from 'mongoose'
import router from './router'

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

app.use(cors())
app.use(bodyParser({ enableTypes: ['json'] }))
app.use(jwt({ secret: process.env.JWTSECRET }).unless({ path: [/^\/login/, /^\/graphiql/]}))
app.use(router.routes())
app.use(router.allowedMethods())

export default app
