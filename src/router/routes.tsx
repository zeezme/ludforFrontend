import { FaHome } from "react-icons/fa"
import { FaUserCircle } from "react-icons/fa"
import { FaPerson } from "react-icons/fa6"
import { lazy } from "react"

const Employee = lazy(() => import("../pages/employee/Employee"))
const Person = lazy(() => import("../pages/person/Person"))

export interface Route {
  title: string
  route: string
  component: React.LazyExoticComponent<() => JSX.Element>
  necessaryPermissions?: string[]
  icon: JSX.Element
}

export const routes: Route[] = [
  {
    title: "Home",
    route: "/",
    component: Employee,
    necessaryPermissions: ["employee_read"],
    icon: <FaHome />,
  },
  {
    title: "Funcionário",
    route: "/employee",
    component: Employee,
    necessaryPermissions: ["employee_read"],
    icon: <FaUserCircle />,
  },
  {
    title: "Pessoa",
    route: "/person",
    component: Person,
    necessaryPermissions: ["person_read"],
    icon: <FaPerson />,
  },
]

