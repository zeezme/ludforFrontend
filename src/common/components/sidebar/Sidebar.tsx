import "./Sidebar.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { Nav, NavItem, NavLink, Button } from "reactstrap"
import { RootState } from "../../../config/store"
import { routes } from "../../../router/routes"
import { ImExit, ImInfo } from "react-icons/im"
import loading from "../../helpers/loading"
import showToast from "../../helpers/showToast"
import { clearState } from "../../../pages/login/loginStore"
import { clearGlobalState } from "../../../config/globalStore"

const Sidebar: React.FC = () => {
  const dispatch = useDispatch()
  const mavigate = useNavigate()

  const token = useSelector((state: RootState) => state.global.token)
  const username = useSelector((state: RootState) => state.global.username)
  const permissions = useSelector(
    (state: RootState) => state.global.permissions
  )
  const [isHovered, setIsHovered] = useState(false)

  // Verifique se o token está presente antes de renderizar a Sidebar
  if (!token) {
    return <Navigate to="/login" replace />
  }

  const hasPermission = (requiredPermissions: string[]) => {
    return requiredPermissions.some(
      (permission) => permission === "*" || permissions.includes(permission)
    )
  }

  const filteredRoutes = routes.filter((route: any) =>
    hasPermission(route.necessaryPermissions || [])
  )

  const handleLogout = () => {
    loading.start()

    localStorage.removeItem("token")

    dispatch(clearState())
    dispatch(clearGlobalState())

    loading.stop()

    showToast.success("Deslogado com sucesso!")

    mavigate("/login")
  }

  return (
    <div>
      <div
        className={`sidebar ${isHovered ? "expanded" : "collapsed"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Nav vertical className="sidebar-nav h-100">
          {filteredRoutes.map((route: any) => (
            <NavItem key={route.route}>
              <NavLink
                tag={Link}
                to={route.route}
                className={`${isHovered ? "nav-link-expanded" : "nav-link"}`}
              >
                {route.icon}
                {isHovered && <div className="ms-2">{route.title}</div>}
              </NavLink>
            </NavItem>
          ))}
          <div className="mt-auto">
            <NavItem>
              {username && (
                <div
                  className={`${isHovered ? "nav-link-expanded" : "nav-link"} w-100`}
                >
                  {isHovered ? (
                    <div className="ms-2 h5">{username} </div>
                  ) : (
                    <ImInfo />
                  )}
                </div>
              )}
              <Button
                className={`${isHovered ? "nav-link-expanded" : "nav-link"} w-100`}
                style={{ borderRadius: 0 }}
                onClick={handleLogout}
              >
                <ImExit /> {isHovered && <div className="ms-2">Sair</div>}
              </Button>
            </NavItem>
          </div>
        </Nav>
      </div>
    </div>
  )
}

export default Sidebar

