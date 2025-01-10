import { FaHome } from "react-icons/fa"
import { FaUserCircle } from "react-icons/fa"
import { Employee } from "../pages/employee/Employee"
import { FaPerson } from "react-icons/fa6"

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
    icon: <FaHome />,
  },
  {
    title: "Funcionário",
    route: "/employee",
    component: <Employee />,
    necessaryPermissions: ["employee_read"],
    icon: <FaUserCircle />,
  },
  {
    title: "Pessoa",
    route: "/person",
    component: <Employee />,
    necessaryPermissions: ["person_read"],
    icon: <FaPerson />,
  },
]
