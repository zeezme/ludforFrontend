import "./router.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from "./routes"
import { Suspense } from "react"
import PermissionsGuard from "../common/guards/PermissionGuard"
import { AuthGuard } from "../common/guards/AuthGuard"
import LoadingProvider from "../common/components/loading/Loading"
import UnauthorizedPage from "../common/components/Unauthorized"
import NotFoundPage from "../common/components/NotFound"
import Login from "../pages/login/Login"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingProvider />}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<AuthGuard />}>
            {routes.map((route) => {
              return (
                <Route
                  key={route.route}
                  path={route.route}
                  element={
                    <PermissionsGuard
                      requiredPermissions={route.necessaryPermissions || []}
                    >
                      <Suspense fallback={<LoadingProvider />}>
                        <route.component />
                      </Suspense>
                    </PermissionsGuard>
                  }
                />
              )
            })}
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter

