import axios from '../utils/customizeAxios'

export const getRoles = () => {
    return axios.get('/api/v1/roles')
}