import { Fragment } from "react/jsx-runtime"
import { Container } from "reactstrap"
import Listing from "../../common/components/listing/Listing"

const Employee = () => {
  return (
    <Fragment>
      <Container>
        <Listing
          title="Funcionários"
          apiEndPoint="employee"
          fields={{
            "person.name": "Nome",
            "person.email": "Email",
          }}
        />
      </Container>
    </Fragment>
  )
}

export default Employee
