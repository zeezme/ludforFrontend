import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { RootState } from "../../config/store"
import tokenHelper from "../helpers/tokenHelper"
import { setToken } from "../../config/globalStore"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.global.token)
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const validateToken = async () => {
      if (location.pathname === "/login") {
        setIsLoading(false)
        setIsAuthenticated(true)
        return
      }

      if (!token) {
        console.log("Token não encontrado, redirecionando para login...")
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }

      const isValidToken = await tokenHelper.validate(token)
      if (!isValidToken) {
        console.log("Token inválido, redirecionando para login...")
        dispatch(setToken(null))
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    validateToken()
  }, [token, dispatch, location.pathname])

  if (isLoading) return <div>Carregando...</div>
  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />

  return <>{children}</>
}

export default AuthGuard
