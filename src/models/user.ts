import { Schema, model, Model, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import token from '../utils/token';

const saltRounds = 10

const getHmac = () => {
  const hmac = crypto.createHmac('sha256', process.env.JWTKEY)
  hmac.update(Date.now().toString())
  return hmac.digest('hex')
}

export interface IUser extends Document {
  email: string
  name: string
  avatar: string
  appSecret: string
  comparePassword(password: string): boolean
}

export interface User extends  IUser {
  _id: string
  id: string
  email: string
  name: string
  avatar: string
  password: string
  appSecret: string
  createAt: string
  updateAt: string
  isActivate: boolean
  token?: string
}

export interface IUserModel extends Model<IUser> {
  checkToken(password: string): boolean
  findByEmail(email: string): User
}

const UserSchema = new Schema({
  email: {
    type: String,
    match: /[a-zA-Z0-9_-]+/,
    required: true,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: true,
    default: '',
  },
  appSecret: {
    type: String,
    default: getHmac(),
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
  isActivate: {
    type: Boolean,
    default: false,
  },
})

UserSchema.pre('save', async function(next: (v?: any) => any) {
  try{
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    return next()
  } catch(e) {
    return next(e)
  }
})

UserSchema.methods.comparePassword = async function(password: string) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.statics.checkToken = async function(token: any) {
  const secret = getHmac()
  const user = await this.findOneAndUpdate({ _id: token.id }, { appSecret: secret })
  if (token.secret === user.appSecret) {
      user.appSecret = secret
      return user
  } else {
      throw new Error('token验证失败！')
  }
}

UserSchema.statics.findByEmail = async function(email: string) {
  const user = await this.findOne({ email })
  return user
}

const UserModel: IUserModel = model<IUser, IUserModel>('user', UserSchema)

export default UserModel


