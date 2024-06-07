import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios'

const axiosInstance = axios.create({
  //baseURL: 'http://localhost:5000/api',

  baseURL: 'https://shopster-backend-nodejs.dev.edyou.io/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {
      // Handle unauthorized error, e.g., redirect to login
      window.location.href = '/'
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
