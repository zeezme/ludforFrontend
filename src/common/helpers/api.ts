import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { store } from "../../config/store"

interface ApiParams {
  endpoint: string
  method?: "GET" | "POST" | "PUT" | "DELETE"
  data?: object
  params?: object
  headers?: object
  useAuthToken?: boolean
}

const api = async ({
  endpoint,
  method = "GET",
  data = {},
  params = {},
  headers = {},
  useAuthToken = false,
}: ApiParams): Promise<AxiosResponse<any> | false> => {
  try {
    const token = store.getState().global.token

    const apiUrl = import.meta.env.VITE_API_URL

    if (!apiUrl) {
      throw new Error("API URL is not defined")
    }

    if (useAuthToken) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      }
    }

    const config: AxiosRequestConfig = {
      method,
      url: `${apiUrl}${endpoint}`,
      data,
      params,
      headers,
    }

    const response = await axios(config)
    return response
  } catch (error: any) {
    console.error("API request failed:", error)
    return false
  }
}

export default api

