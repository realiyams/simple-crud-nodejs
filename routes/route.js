import pages from './../controller/pages.js'

const route = (url, req, res) => {
  if (req.method === 'GET') {
    
    const Pages = new pages()
    if (url.pathname === '/')            Pages.index(req, res)
    if (url.pathname === '/histories')   Pages.history(req, res)
    if (url.pathname === '/movies')      Pages.movies(req, res)
    if (url.pathname === '/peoples')     Pages.people(req, res)
    if (url.pathname === '/about')       Pages.about(req, res)
  }
}

export default route