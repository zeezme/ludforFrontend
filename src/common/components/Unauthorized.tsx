import { Container, Row, Col, Button } from "reactstrap"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { clearState } from "../../pages/login/loginStore"
import loading from "../helpers/loading"
import { clearGlobalState } from "../../config/globalStore"
import showToast from "../helpers/showToast"

const Unauthorized = () => {
  const dispatch = useDispatch()
  const mavigate = useNavigate()

  const handleLogout = () => {
    loading.start()

    localStorage.removeItem("token")

    dispatch(clearState())
    dispatch(clearGlobalState())

    loading.stop()

    showToast.success("Deslogado com sucesso!")

    mavigate("/login")
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="text-center">
        <Col>
          <h1 className="display-1 text-danger">401</h1>
          <p className="lead">Sem Permissão Adequada</p>
          <p>Você não tem permissão para acessar esse conteúdo.</p>
          <div>
            <Button color="secondary" className="me-2" onClick={handleLogout}>
              Logout
            </Button>

            <Link to="/">
              <Button color="primary">Voltar para a página inicial</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Unauthorized
