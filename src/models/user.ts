import mongoose from 'mongoose'

type User = {
  name: string
  avatar: string
}

const UserScheme = new mongoose.Schema({
  name: String,
  avatar: String,
})

const UserModel = mongoose.model('user', UserScheme)

export default UserModel


