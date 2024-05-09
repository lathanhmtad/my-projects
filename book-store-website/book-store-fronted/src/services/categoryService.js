import axios from '../utils/customizeAxios'

class CategoryService {
    getCategoriesTree() {
        return axios.get('/api/v1/categories/tree')
    }

    getAllCategories(page, size) {
        return axios.get(`/api/v1/categories?page=${page}&limit=${size}`)
    }

    getCategoryById(categoryId) {
        return axios.get(`/api/v1/categories/${categoryId}`)
    }

    createCategory(data) {
        return axios.post('/api/v1/categories', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    updateCategory(categoryId, formData) {
        return axios.put(`/api/v1/categories/${categoryId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    deleteCategory(categoryId) {
        return axios.delete(`/api/v1/categories/${categoryId}`)
    }
}

export default new CategoryService()