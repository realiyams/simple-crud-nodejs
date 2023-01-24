import * as mysql from 'mysql'
import * as dotenv from 'dotenv'
dotenv.config()

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.password,
})

connection.connect((err) => {
  if (err) throw err
})

connection.query("CREATE DATABASE IF NOT EXISTS mydb", (err, result) => {
  if (err) throw err
})

connection.query("USE mydb", (err, result) => {
  if (err) throw err
})

export default connection