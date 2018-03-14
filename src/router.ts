import Router from 'koa-router'
import UserModel, { IUser, User } from './models/user'
import token from './utils/token'

const router = new Router()

router.post('/login', async (ctx, next) => {
  const { email, password } = ctx.request.body
  try {
    if (email && password) {
      const user = await UserModel.findByEmail(email)
      // 用户存在
      if (user) {
        const canLogin = await user.comparePassword(password)
        if (canLogin) {
          const newToken = token.signToke(<User>{
            id: user._id,
            appSecret: user.appSecret,
          })
          ctx.body = {
            id: user._id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            token: newToken,
          }
        } else {
          ctx.status = 401
          ctx.body = "用户名密码错误"
        }
      } else {
        // 用户不存在 自动注册用户
        const newUser = new UserModel({
          email,
          password,
        })
        const saveUser = await newUser.save()
        const newToken = token.signToke(<User>{
          id: saveUser._id,
          appSecret: saveUser.appSecret,
        })
        ctx.body = {
          id: saveUser._id,
          email: saveUser.email,
          name: saveUser.name,
          avatar: saveUser.avatar,
          token: newToken,
        }
      }
    } else {
      ctx.status = 400
      ctx.body = '需要 email 和 password 字段'
    }
  } catch(e) {
    throw e
  }
})

router.post('/notebook', async ctx => {
  const user = await token.checkToken(ctx, UserModel, true)
  const word = ctx.request.body
  await UserModel.addNotebook(user.id, word)
  ctx.body = JSON.stringify('ok')
})

router.get('/userinfo', async ctx => {
  const user: User = await token.checkToken(ctx, UserModel, true)
  ctx.body = {
    id: user._id,
    name: user.name,
    notebook: user.notebook,
    token: token.signToke(<User>user),
  }
})


export default router
