import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from "./routes"
import AuthGuard from "../common/guards/AuthGuard"
import PermissionsGuard from "../common/guards/PermissionGuard"
import NotFound from "../common/components/NotFound"
import { Login } from "../pages/login/Login"
import Sidebar from "../common/components/sideBard/SideBar"
import "./router.css"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthGuard>
        <div className="app-layout">
          <Sidebar />

          <div className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />

              {routes.map((route) => (
                <Route
                  key={route.route}
                  path={route.route}
                  element={
                    <PermissionsGuard
                      requiredPermissions={route.necessaryPermissions || []}
                    >
                      {route.component}
                    </PermissionsGuard>
                  }
                />
              ))}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default AppRouter
