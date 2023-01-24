import connection from './../databases/connection.js'

const response = (resObj, res) => {
  res.setHeader("Content-Type", "application/json")
  res.writeHead(200)
  res.end(JSON.stringify(resObj, null, 2))
}

const people = (req, res) => {
  let body = [],
    resObj = {},
    selectField,
    sql = ''

  req.on('data', (chunk) => {
    body.push(chunk)
  })

  if (req.method == 'GET') {
    connection.query('SELECT * FROM peoples', (err, data) => {

      response(data, res)
    })
  }

  if (req.method == 'POST') {
    req.on('end', () => {
      body = Buffer.concat(body).toString()
      
      let people = body.split('&')
      people[0] = people[0].split('=')
      people[1] = people[1].split('=')

      people[1][1] = people[1][1].replace(/\+/g, ' ')

      connection.query('INSERT INTO peoples(salutation_id, name) VALUES(' + parseInt(people[0][1]) + ', "'+ people[1][1] +'" )', (err, result) => {
        if (err) throw err

        resObj['id'] = result.insertId
        resObj['salutation'] = parseInt(people[0][1])
        resObj['name'] = people[1][1]

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

      sql = 'UPDATE peoples SET name = "' + selectField[1][1] + '" WHERE id = "' + selectField[0][1] + '"'
        
      connection.query(sql, (err, result) => {
        if (err) throw err

        resObj['new Name'] = selectField[1][1]

        response(resObj, res)
      })
    })
  }

  if (req.method == 'DELETE') {
    req.on('end', () => {
      body = Buffer.concat(body).toString()
      
      selectField = body.split('=')

      sql = 'DELETE FROM peoples WHERE id = "' + selectField[1] + '"'
        
      connection.query(sql, (err, result) => {
        if (err) throw err

        resObj['deleted people'] = selectField[1]

        response(resObj, res)
      })
    })
  }
}

export default people