import * as fs from 'fs'

// const pages = (req, res) => {
//   if (req.method == 'GET') {
//     fs.readFile(process.cwd() + '/views/index.html', (err, data) => {
//       res.setHeader("Content-Type", "text/html")
//       res.writeHead(200)
//       res.write(data)
//       res.end()
//     })
//   }
// }

class pages {
  readpages(url, req, res) {
    fs.readFile(process.cwd() + url, (err, data) => {
      res.setHeader("Content-Type", "text/html")
      res.writeHead(200)
      res.write(data)
      res.end()
    })
  }

  index(req, res) {
    this.readpages('/views/index.html', req, res)
  }

  history(req, res) {
    this.readpages('/views/history.html', req, res)
  }

  movies(req, res) {
    this.readpages('/views/movies.html', req, res)
  }

  people(req, res) {
    this.readpages('/views/people.html', req, res)
  }

  about(req, res) {
    res.write('about page')
    res.end()
  }
}

export default pages