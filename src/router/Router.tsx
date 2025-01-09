import "./router.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from "./routes"
import { Login } from "../pages/login/Login"
import AuthGuard from "../common/guards/AuthGuard"
import PermissionsGuard from "../common/guards/PermissionGuard"
import NotFound from "../common/components/NotFound"
import Unauthorized from "../common/components/Unauthorized"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<AuthGuard />}>
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
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
