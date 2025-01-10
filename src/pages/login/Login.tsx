import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import { Fragment, useState } from "react"
import DefaultInput from "../../common/components/inputs/DefaultInput"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../config/store"
import { clearState, setFieldValue } from "./loginStore"
import api from "../../common/helpers/api"
import showToast from "../../common/helpers/showToast"
import loading from "../../common/helpers/loading"
import DefaultInputPassword from "../../common/components/inputs/DefaultInputPassword"
import DefaultInputEmail from "../../common/components/inputs/DefaultInputEmail"
import { setPermissions, setToken, setUsername } from "../../config/globalStore"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const loginState = useSelector((state: RootState) => state.login)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => setShowModal(!showModal)

  const handleSubmitLogin = async () => {
    loading.start()

    const { username, password } = loginState

    const apiResponse = await api({
      endpoint: "signin",
      method: "POST",
      data: { username, password },
    })

    if (apiResponse === false) {
      showToast.error("Nome de usuário ou senha incorretos!")
      loading.stop()
      return
    }

    dispatch(setToken((apiResponse?.data as any).token))
    dispatch(setPermissions((apiResponse?.data as any).permissions))
    dispatch(setUsername((apiResponse?.data as any).username))

    showToast.success("Sucesso no login!")
    loading.stop()

    navigate("/employee")
  }

  const handleSubmitCreateAccount = async () => {
    loading.start()

    const { username, password, email } = loginState

    const apiResponse = await api({
      endpoint: "signup",
      method: "POST",
      data: { username, password, email },
    })

    if (apiResponse === false) {
      showToast.error("Error creating account")
      loading.stop()
      return
    }

    dispatch(setToken((apiResponse?.data as any).token))
    dispatch(setPermissions((apiResponse?.data as any).permissions))

    showToast.success("Usuário criado com sucesso!")

    loading.stop()

    toggleModal()

    navigate("/employee")
  }

  return (
    <Fragment>
      <Container
        fluid
        style={{ height: "100vh", display: "flex", alignItems: "center" }}
      >
        <Card style={{ width: "400px", margin: "0 auto" }}>
          <CardBody>
            <Row>
              <Col className="d-flex flex-column">
                <DefaultInput
                  label="Nome"
                  field="username"
                  store={loginState}
                  setFieldValue={setFieldValue}
                  type="text"
                  className="mb-3"
                  required
                />
                <DefaultInputPassword
                  label="Senha"
                  field="password"
                  store={loginState}
                  setFieldValue={setFieldValue}
                  type="password"
                  className="mb-3"
                  required
                />
                <div className="d-flex flex-row">
                  <Col lg="6" className="me-2">
                    <Button
                      className="w-100"
                      color="secondary"
                      onClick={toggleModal}
                    >
                      Criar Conta
                    </Button>
                  </Col>

                  <Col lg="6">
                    <Button
                      className="w-100"
                      color="primary"
                      onClick={handleSubmitLogin}
                    >
                      Entrar
                    </Button>
                  </Col>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>

      <Modal
        isOpen={showModal}
        toggle={toggleModal}
        onClosed={() => {
          dispatch(clearState())
        }}
      >
        <ModalHeader toggle={toggleModal}>Criar Conta</ModalHeader>
        <ModalBody>
          <DefaultInputEmail
            label="Email"
            field="email"
            store={loginState}
            setFieldValue={setFieldValue}
            type="text"
            className="mb-3"
            required
          />
          <DefaultInput
            label="Nome"
            field="username"
            store={loginState}
            setFieldValue={setFieldValue}
            type="text"
            className="mb-3"
            required
          />
          <DefaultInputPassword
            label="Senha"
            field="password"
            store={loginState}
            setFieldValue={setFieldValue}
            type="password"
            className="mb-3"
            required
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmitCreateAccount}>
            Criar Conta
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}
