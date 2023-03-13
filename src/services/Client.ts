import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

const baseURL = isProduction
  ? 'https://api-dictionary.onrender.com'
  : 'http://localhost:3001'

export const clientProvider = axios.create({
  baseURL,
})
