import { Container, Row, Col, Button } from "reactstrap"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="text-center">
        <Col>
          <h1 className="display-1 text-danger">404</h1>
          <p className="lead">Página não encontrada</p>
          <p>
            A página que você está procurando não existe. Você pode voltar para
            a página inicial.
          </p>
          <Link to="/">
            <Button color="primary">Voltar para a página inicial</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
