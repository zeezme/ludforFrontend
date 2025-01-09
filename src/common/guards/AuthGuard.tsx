import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation, Outlet } from "react-router-dom"
import { RootState } from "../../config/store"
import tokenHelper from "../helpers/tokenHelper"
import { setToken } from "../../config/globalStore"
import Sidebar from "../components/sidebar/Sidebar"
import { Spinner } from "reactstrap"

const AuthGuard = () => {
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

  if (isLoading)
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
        }}
      >
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1050,
            textAlign: "center",
          }}
        >
          <Spinner
            style={{ width: "3rem", height: "3rem" }}
            size="lg"
            color="light"
          />
        </div>
      </div>
    )

  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />

  return (
    <div className="container-fluid d-flex">
      <div>
        <Sidebar />
      </div>

      <div className="col">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthGuard
