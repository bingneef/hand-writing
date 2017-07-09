import axios from 'axios'
import { browserHistory } from 'react-router'

const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: `${ webpackEnv.SERVER_HOST }`
})

export default instance
