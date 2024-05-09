import axios from '../utils/customizeAxios'

class UserService {
    login(email, password) {
        return axios.post('/api/v1/auth/login', { email, password })
    }

    logout(userId) {
        return axios.get(`/api/v1/auth/logout/${userId}`)
    }

    getCurrentUser() {
        return axios.get('/api/v1/users/current')
    }

    getUsersWithPagination(page, limit) {
        return axios.get(`/api/v1/users?page=${page}&limit=${limit}`)
    }

    getUserById(userId) {
        return axios.get(`/api/v1/users/${userId}`)
    }

    createNewUser(formData) {
        return axios.post(`/api/v1/users`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    updateUser(userId, formData) {
        return axios.put(`/api/v1/users/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    deleteUser(id) {
        return axios.delete(`/api/v1/users/${id}`)
    }
}

export default new UserService()