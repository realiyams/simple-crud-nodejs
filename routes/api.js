import movies from './../controller/movies.js'
import salutation from './../controller/salutation.js'
import people from './../controller/people.js'
import address from './../controller/address.js'
import history from './../controller/history.js'
import route from './route.js'

const api = (url, req, res) => {
  if (url.pathname === '/get/movies')       movies(req, res)
  if (url.pathname === '/get/salutations')  salutation(req, res)
  if (url.pathname === '/get/peoples')      people(req, res)
  if (url.pathname === '/get/address')      address(req, res)
  if (url.pathname === '/get/histories')    history(req, res)
}

export default api