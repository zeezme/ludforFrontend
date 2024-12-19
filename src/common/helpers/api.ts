import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiParams {
  endpoint: string
  method?: "GET" | "POST" | "PUT" | "DELETE"
  data?: object
  params?: object
  headers?: object
}

const api = async <T>({
  endpoint,
  method = "GET",
  data = {},
  params = {},
  headers = {},
}: ApiParams): Promise<AxiosResponse<T> | false> => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL

    if (!apiUrl) {
      throw new Error("API URL is not defined")
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
