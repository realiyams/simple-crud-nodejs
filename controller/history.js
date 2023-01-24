import connection from './../databases/connection.js'

const response = (resObj, res) => {
  res.setHeader("Content-Type", "application/json")
  res.writeHead(200)
  res.end(JSON.stringify(resObj, null, 2))
}

const history = (req, res) => {
  let body = [],
    resObj = {},
    selectField,
    sql = ''

  req.on('data', (chunk) => {
    body.push(chunk)
  })

  if (req.method == 'GET') {
    connection.query('SELECT * FROM histories', (err, data) => {

      response(data, res)
    })
  }

  if (req.method == 'POST') {
    req.on('end', () => {
      body = Buffer.concat(body).toString()
      
      let history = body.split('&')
      console.log(history)
      for (let i = 0; i < history.length; i++) {
        history[i] = history[i].split('=')
      }
      const date = new Date().toLocaleString().split(',')[0]
      console.log(date)

      connection.query('INSERT INTO histories(movie_id, people_id, date) VALUES(' + parseInt(history[0][1]) + ', '+ parseInt(history[1][1]) +', ' + date + ' )', (err, result) => {
        if (err) throw err

        resObj['id'] = result.insertId
        resObj['id'] = result.insertId
        resObj['movie_id'] = parseInt(history[0][1])
        resObj['people_id'] = parseInt(history[1][1])
        resObj['date'] = date

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

      sql = 'UPDATE address SET address = "' + selectField[1][1] + '" WHERE id = "' + selectField[0][1] + '"'
        
      connection.query(sql, (err, result) => {
        if (err) throw err

        resObj['new address'] = selectField[1][1]

        response(resObj, res)
      })
    })
  }

  if (req.method == 'DELETE') {
    req.on('end', () => {
      body = Buffer.concat(body).toString()
      
      selectField = body.split('=')

      sql = 'DELETE FROM histories WHERE id = "' + selectField[1] + '"'
        
      connection.query(sql, (err, result) => {
        if (err) throw err

        resObj['deleted histories'] = selectField[1]

        response(resObj, res)
      })
    })
  }
}

export default history