import axios from '../utils/customizeAxios'

class BrandService {
    getBrands(page, size) {
        return axios.get(`/api/v1/brands?page=${page}&limit=${size}`)
    }

    getBrandByID(brandId) {
        return axios.get(`/api/v1/brands/${brandId}`)
    }

    createBrand(data) {
        return axios.post('/api/v1/brands', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    updateBrand(brandId, data) {
        return axios.put(`/api/v1/brands/${brandId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    deleteBrand(brandId) {
        return axios.delete(`/api/v1/brands/${brandId}`)
    }
}

export default new BrandService()