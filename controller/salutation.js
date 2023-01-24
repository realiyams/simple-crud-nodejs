import connection from './../databases/connection.js'

const response = (resObj, res) => {
  res.setHeader("Content-Type", "application/json")
  res.writeHead(200)
  res.end(JSON.stringify(resObj, null, 2))
}

const salutation = (req, res) => {
  let body = [],
  resObj = {},
  selectField,
  sql = ''

  req.on('data', (chunk) => {
    body.push(chunk)
  })

  if (req.method == 'GET') {
    connection.query('SELECT * FROM salutations', (err, data) => {
      response(data, res)
    })
  }

  if (req.method == 'POST') {
    req.on('end', () => {
      body = Buffer.concat(body).toString()
      
      let salutation = body.split('=')
      
      connection.query('INSERT INTO salutations(salutation) VALUES("' + salutation[1] + '")', (err, result) => {
        if (err) throw err

        resObj['id'] = result.insertId
        resObj[salutation[0]] = salutation[1]

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

      sql = 'UPDATE salutations SET salutation = "' + selectField[1][1] + '" WHERE id = "' + selectField[0][1] + '"'

      connection.query(sql, (err, result) => {
        if (err) throw err

        resObj[selectField[0][0]] = selectField[0][1]
        resObj['new salutation'] = selectField[1][1]

        response(resObj, res)
      })
    })
  }

  if (req.method == 'DELETE') {
    req.on('end', () => {
      body = Buffer.concat(body).toString()
      
      selectField = body.split('=')

      sql = 'DELETE FROM salutations WHERE id = "' + selectField[1] + '"'
        
      connection.query(sql, (err, result) => {
        if (err) throw err

        resObj['deleted salutation'] = selectField[1]
        response(resObj, res)
      })
    })
  }
}

export default salutation