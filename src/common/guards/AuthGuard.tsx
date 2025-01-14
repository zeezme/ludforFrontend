import { Navigate, Outlet, useLocation } from "react-router-dom"
import { Spinner } from "reactstrap"
import Sidebar from "../components/sidebar/Sidebar"
import { useAuth } from "../hooks/UseAuth"

export const AuthGuard = () => {
  const location = useLocation()
  const { isLoading, isAuthenticated } = useAuth(location.pathname)

  if (isLoading) {
    return (
      <div className="auth-loading">
        <Spinner style={{ width: "3rem", height: "3rem" }} color="light" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return (
    <div className="container-fluid d-flex">
      <div
        style={{
          zIndex: 1000,
        }}
      >
        <Sidebar />
      </div>

      <div
        className="col"
        style={{
          marginLeft: "60px",
          marginTop: "40px",
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}

