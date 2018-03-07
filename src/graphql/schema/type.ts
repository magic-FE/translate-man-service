export default `

scalar Date

scalar URL

scalar Email

type Query {
  getUser(id: ID): User
  isRegistered(email: Email): Boolean
}

type User {
  id: ID
  token: String
  name: String
  email: String
  avatar: URL
  # 翻译历史
  history: [Search]
  # 生词本
  notebook: [Search]
}

type Search {
  word: String
  time: Date
}

type Mutation {
  # 登录 如果没有会自动创建并发送确认邮件
  login(email: String!, password: String!): User
}

input NewUser {
  email: String!
  password: String!
  name: String
  avatar: URL
}
`
