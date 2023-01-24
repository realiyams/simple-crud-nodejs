import * as http from 'http'
import * as Url from 'url'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config()

import connection from './databases/connection.js'
import './databases/model.js'

import api from './routes/api.js'
import route from './routes/route.js'
import Static from './Static.js'

const app = http.createServer((req, res) => {
  const url = Url.parse(req.url, true)
    api(url, req, res)
    route(url, req, res)
    Static(url, req, res)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('your app is listening to port ' + listener.address().port)
})