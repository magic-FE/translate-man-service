import dotenv from 'dotenv'
// 从 .env 文件加载环境变量 包括数据库地址，用户名，密码等
dotenv.config()
import app from './app'

app.listen(3000, () => {
  console.log('server start at: http://localhost:3000')
})
