import { FaUser, FaHome } from "react-icons/fa"
import { Employee } from "../pages/employee/Employee"

export interface Route {
  title: string
  route: string
  component: JSX.Element
  necessaryPermissions?: string[]
  icon: JSX.Element
}

export const routes: Route[] = [
  {
    title: "Home",
    route: "/",
    component: <Employee />,
    necessaryPermissions: ["employee_read"],
    icon: <FaUser />,
  },
  {
    title: "Funcionário",
    route: "/employee",
    component: <Employee />,
    necessaryPermissions: ["employee_read"],
    icon: <FaUser />,
  },
  {
    title: "Pessoa",
    route: "/person",
    component: <Employee />,
    necessaryPermissions: ["person_read"],
    icon: <FaHome />,
  },
]
