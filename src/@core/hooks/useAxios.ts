import {useCallback, useState} from 'react'
import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import axiosInstance from 'src/configs/axiosInterceptor'

interface UseAxiosResult<T> {
  data: T | null
  error: AxiosError | null
  loading: boolean
  sendRequest: (config?: AxiosRequestConfig) => Promise<void>
}

const useAxios = <T = any>(initialConfig: AxiosRequestConfig = {}): UseAxiosResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<AxiosError | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const sendRequest = useCallback(
    async (config: AxiosRequestConfig = {}) => {
      setLoading(true)
      try {
        const response: AxiosResponse<T> = await axiosInstance({...initialConfig, ...config})
        setData(response.data)
      } catch (err) {
        setError(err as AxiosError)
      } finally {
        setLoading(false)
      }
    },
    [initialConfig]
  )

  return {data, error, loading, sendRequest}
}

export default useAxios
