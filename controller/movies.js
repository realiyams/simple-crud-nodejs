import connection from './../databases/connection.js'

const response = (resObj, res) => {
  res.setHeader("Content-Type", "application/json")
  res.writeHead(200)
  res.end(JSON.stringify(resObj, null, 2))
}

const movies = (req, res) => {
  let body = [],
    resObj = {},
    selectField,
    sql = ''

  req.on('data', (chunk) => {
    body.push(chunk)
  })

  if (req.method == 'GET') {
    connection.query('SELECT * FROM movies', (err, data) => {

      response(data, res)
    })
  }

  if (req.method == 'POST') {
    req.on('end', () => {
      body = Buffer.concat(body).toString()
      
      let movie = body.split('=')
      movie[1] = movie[1].replace(/\+/g, ' ')
      
      connection.query('INSERT INTO movies(movie) VALUES("' + movie[1] + '")', (err, result) => {
        if (err) throw err

        resObj['id'] = result.insertId
        resObj[movie[0]] = movie[1]

        response(resObj, res)
      })
    })
  }

  if (req.method == 'PUT') {
    req.on('end', () => {
      body = Buffer.concat(body).toString()
      
      selectField = body.split('&')
      selectField[0] = selectField[0].split('=')
      selectField[1] = selectField[1].split('=')
      selectField[1][1] = selectField[1][1].replace(/\+/g, ' ')
      
      sql = 'UPDATE movies SET movie = "' + selectField[1][1] + '" WHERE id = "' + selectField[0][1] + '"'

      connection.query(sql, (err, result) => {
        if (err) throw err

        resObj['id'] = selectField[0][1]
        resObj['movie'] = selectField[1][1]

        response(resObj, res)
      })
    })
  }

  if (req.method == 'DELETE') {
    req.on('end', () => {
      body = Buffer.concat(body).toString()
      selectField = body.split('=')

      sql = 'DELETE FROM movies WHERE id = "' + selectField[1] + '"'

      connection.query(sql, (err, result) => {
        if (err) throw err

        resObj['deleted movies'] = selectField[1]

        response(resObj, res)
      })
    })
  }
}

export default movies