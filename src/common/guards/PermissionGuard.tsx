import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { RootState } from "../../config/store"

interface PermissionsGuardProps {
  requiredPermissions: string[]
  children: React.ReactNode
}

const PermissionsGuard = ({
  requiredPermissions,
  children,
}: PermissionsGuardProps) => {
  const permissions = useSelector(
    (state: RootState) => state.global.permissions
  )
  const location = useLocation()

  if (location.pathname === "/login") {
    return <>{children}</>
  }

  const hasPermission = requiredPermissions.every((permission) =>
    permissions.includes(permission)
  )

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace state={{ from: location }} />
  }

  return <>{children}</>
}

export default PermissionsGuard
