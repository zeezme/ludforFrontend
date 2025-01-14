import { Fragment } from "react/jsx-runtime"
import { Container } from "reactstrap"
import Listing from "../../common/components/listing/Listing"

const Person = () => {
  return (
    <Fragment>
      <Container>
        <Listing
          title="Pessoas"
          apiEndPoint="person"
          fields={{
            name: "Nome",
            email: "Email",
          }}
        />
      </Container>
    </Fragment>
  )
}

export default Person

