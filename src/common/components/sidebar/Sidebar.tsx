import "./Sidebar.css"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import { Nav, NavItem, NavLink, Button } from "reactstrap"
import { RootState } from "../../../config/store"
import { routes } from "../../../router/routes"
import { ImExit } from "react-icons/im"

const Sidebar: React.FC = () => {
  const token = useSelector((state: RootState) => state.global.token)
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

  return (
    <div className="app-layout">
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
              <Button
                className={`${isHovered ? "nav-link-expanded" : "nav-link"} w-100`}
                style={{ borderRadius: 0 }}
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
