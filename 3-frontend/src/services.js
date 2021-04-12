import axios from 'axios'
const baseUrl = '/api/blogs'
const baseLogin = '/api/login'

//services-luokka hoitaa kommunikoinnin backendin kassa käyttäen axiossia


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

//uuden blogin luominen
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

//kaikkien blogien hakeminen
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response =>  response.data)
}


//käyttjän kirjaaminen
const login = async credentials => {
  const response = await axios.post(baseLogin, credentials)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${ baseUrl }/${id}`, newObject, config)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${ baseUrl }/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, login, create, setToken, update, deleteBlog }

