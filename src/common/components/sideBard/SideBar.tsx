import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Nav, NavItem, NavLink, Collapse, NavbarToggler } from "reactstrap"
import { FaBars } from "react-icons/fa"
import "./Sidebar.css"
import { RootState } from "../../../config/store"
import { routes } from "../../../router/routes"

const Sidebar = () => {
  const permissions = useSelector(
    (state: RootState) => state.global.permissions
  )
  const [isOpen, setIsOpen] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const hasPermission = (requiredPermissions: string[]) => {
    return requiredPermissions.every((permission) =>
      permissions.includes(permission)
    )
  }

  const filteredRoutes = routes.filter((route: any) =>
    hasPermission(route.necessaryPermissions || [])
  )

  if (filteredRoutes.length === 0) {
    return null
  }

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <div className={`sidebar-wrapper`}>
      <div
        className={`sidebar ${isHovered ? "expanded" : "collapsed"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <NavbarToggler onClick={toggleSidebar} className="d-md-none">
          <FaBars />
        </NavbarToggler>
        <Collapse isOpen={isOpen}>
          <Nav vertical className="sidebar-nav">
            {filteredRoutes.map((route: any) => (
              <NavItem key={route.route}>
                <NavLink tag={Link} to={route.route} className="nav-link">
                  {route.icon}
                  <span>{isHovered && route.title}</span>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </div>
    </div>
  )
}

export default Sidebar
