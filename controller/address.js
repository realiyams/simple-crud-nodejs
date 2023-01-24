import connection from './../databases/connection.js'

const response = (resObj, res) => {
  res.setHeader("Content-Type", "application/json")
  res.writeHead(200)
  res.end(JSON.stringify(resObj, null, 2))
}

const address = (req, res) => {
  let body = [],
    resObj = {},
    selectField,
    sql = ''

  req.on('data', (chunk) => {
    body.push(chunk)
  })

  if (req.method == 'GET') {
    connection.query('SELECT * FROM address', (err, data) => {

      response(data, res)
    })
  }

  if (req.method == 'POST') {
    req.on('end', () => {
      body = Buffer.concat(body).toString()
      
      let address = body.split('&')
      address[0] = address[0].split('=')
      address[1] = address[1].split('=')

      address[1][1] = address[1][1].replace(/\+/g, ' ')

      connection.query('INSERT INTO address(people_id, address) VALUES(' + parseInt(address[0][1]) + ', "'+ address[1][1] +'" )', (err, result) => {
        if (err) throw err

        resObj['id'] = result.insertId
        resObj['people_id'] = parseInt(address[0][1])
        resObj['address'] = address[1][1]

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

      sql = 'DELETE FROM address WHERE id = "' + selectField[1] + '"'
        
      connection.query(sql, (err, result) => {
        if (err) throw err

        resObj['deleted address'] = selectField[1]

        response(resObj, res)
      })
    })
  }
}

export default address