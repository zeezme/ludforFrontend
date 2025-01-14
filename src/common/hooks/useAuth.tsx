import { useState, useEffect } from "react"
import tokenHelper from "../helpers/tokenHelper"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../config/store"
import { setToken } from "../../config/globalStore"

export const useAuth = (path: string) => {
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.global.token)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const validateToken = async () => {
      if (path === "/login") {
        setIsLoading(false)
        setIsAuthenticated(true)
        return
      }

      if (!token) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }

      if (isAuthenticated) return

      const isValidToken = await tokenHelper.validate(token)

      if (!isValidToken) {
        dispatch(setToken(null))
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    validateToken()
  }, [path, token, dispatch, isAuthenticated])

  return { isLoading, isAuthenticated }
}

