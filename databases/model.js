import connection from './connection.js'

const movie = `
  CREATE TABLE IF NOT EXISTS Movies(
    id INT NOT NULL AUTO_INCREMENT,
    movie VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
  )
`

const salutation = `
  CREATE TABLE IF NOT EXISTS Salutations(
    id INT NOT NULL AUTO_INCREMENT,
    salutation VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
  )
`
  
const people = `
  CREATE TABLE IF NOT EXISTS peoples(
    id INT NOT NULL AUTO_INCREMENT,
    salutation_id INT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(salutation_id) REFERENCES Salutations(id)
      ON DELETE SET NULL
  )
`

const address = `
  CREATE TABLE IF NOT EXISTS address(
    id INT NOT NULL AUTO_INCREMENT,
    people_id INT,
    address VARCHAR(50) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(people_id) REFERENCES peoples(id)
      ON DELETE CASCADE
  )
`

const history = `
  CREATE TABLE IF NOT EXISTS histories(
    id INT NOT NULL AUTO_INCREMENT,
    movie_id INT,
    people_id INT,
    date DATE NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(movie_id) REFERENCES movies(id)
      ON DELETE SET NULL,
    FOREIGN KEY(people_id) REFERENCES peoples(id)
      ON DELETE CASCADE
  )
`

connection.query(movie)
connection.query(salutation)
connection.query(people)
connection.query(address)
connection.query(history)