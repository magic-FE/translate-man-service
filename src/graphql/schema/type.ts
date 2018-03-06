const type = `scalar Date

scalar URL

type Query {
  user(id: ID): User
}

type User {
  id: ID!
  name: String
  avatar: URL
  # 翻译历史
  history: [Search]!
  # 生词本
  notebook: [Search]!
}

type Search {
  word: String
  time: Date
}`

export default type

