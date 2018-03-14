import jwt from 'jsonwebtoken'
import { User } from '../models/user'

// 生成token
const signToke = function(user: User) {
  const token = jwt.sign({
      id: user.id,
      secret: user.appSecret,
  }, process.env.JWTSECRET, { expiresIn: 3600 })
  return token
}

// 检查并更新token
async function checkToken(ctx: any, userModel: any, getUser: any) {
    const token = ctx.state.user
    if (token) {
      const user = await userModel.checkToken(token)
      if (user) {
        if (getUser) {
          return user
        } else {
          return ''
        }
      } else {
        ctx.throw(501, 'token信息异常')
      }
    } else {
      ctx.throw(404, 'token丢失')
    }
}

type Token = {
  signToke(user: User): any
  checkToken(ctx: any, userModel: any, getUser: any): any
}

const token: Token = {
  signToke,
  checkToken,
}

export default token
