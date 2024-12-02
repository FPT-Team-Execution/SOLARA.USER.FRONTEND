import { notification } from 'antd'
import axios from 'axios'
import { BASE_API_URL } from '../../constants/apis/'

const axiosClient = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'content-type': 'application/json'
    },
    timeout: 300000,
    timeoutErrorMessage: `Connection is timeout exceeded`
})

axiosClient.interceptors.request.use(async (config) => {
    return config
})

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response
        }
        return response
    },
    (error) => {
        notification.error({
            message: 'Error',
            description: error.message
        })
        throw error
    }
)
export default axiosClient
