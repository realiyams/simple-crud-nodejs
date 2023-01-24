import * as fs from 'fs'
import * as path from 'path'

const Static = (url, req, res) => {
  const pathname = `.${url.pathname}`
  const address = path.parse(pathname)
  
  if (address.dir === './public' || address.dir === './components') {
    const map = {
      '.ico': 'image/x-icon',
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.json': 'application/json',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.wav': 'audio/wav',
      '.mp3': 'audio/mpeg',
      '.svg': 'image/svg+xml',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword'
    }

    fs.exists(pathname, (exist) => {
      if(!exist) {
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`)
        return
      }
    
    if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext
    
      fs.readFile(pathname, (err, data) => {
        if(err){
          res.statusCode = 500
          res.end(`Error getting the file: ${err}.`)
        } else {
          res.setHeader('Content-type', map[address.ext] || 'text/plain' )
          res.end(data)
        }
      })
    })
  }
}

export default Static


