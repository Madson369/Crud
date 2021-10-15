import "./Home.css";
import {
  getUser,
  getAllUsers,
  deleteUser,
  saveUser,
  editUser,
  getUserLogin,
} from "./components/GetData";
import {
  Input,
  Td,
  Th,
  Modal,
  Close,
  LabelForm,
  Table,
  FormSpan,
  AddButton,
  Button,
  FormCont,
  Form,
  Icon,
} from "./components/atoms/index";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "./actions/GetLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faUserPlus,
  faTimes,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function Home() {
  const dispatch = useDispatch();
  let users = useSelector((state) => state.data);
  let result = useSelector((state) => state.result);
  let Login = useSelector((state) => state.login);

  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [evento, setEvento] = useState("");

  useEffect(() => {
    getAllUsers(dispatch);
  }, []);

  useEffect(() => {
    getAllUsers(dispatch);
    try {
      if (result[0].isAxiosError) {
        console.log(result[0].response.data.error.errors[0]);
        toast.error(`${result[0].response.data.error.errors[0]}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        console.log("tudo ok");
        setVisible(false);
        setVisibleEdit(false);
        toast.success("", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (error) {}
  }, [result]);

  const onChange = (event) => {
    setEvento(event.target.value);
    console.log(evento);
  };

  const onBlur = () => {
    console.log(evento);
    if (evento !== currentUser.login) {
      if (evento.length > 0) {
        getUserLogin(evento, dispatch);
      } else {
        dispatch(login({}));
      }
    }
  };

  return (
    <div className="container">
      <AddButton
        onClick={() => {
          setVisible(true);
        }}
      >
        {" "}
        <FontAwesomeIcon icon={faUserPlus} />{" "}
      </AddButton>
      <div className="table_container">
        <Table>
          <Th>Nome</Th>
          <Th>Login</Th>
          <Th>CPF</Th>
          <Th>E-mail</Th>
          <Th>Codigo de agente</Th>
          {users && users[0] && users[0].length > 0
            ? users[0].map((u) => {
                return (
                  <tr>
                    <Td>{u.Nome}</Td>
                    <Td>{u.login}</Td>
                    <Td>{u.CPF}</Td>
                    <Td>{u.Email}</Td>
                    <Td>{u.AgentCode}</Td>
                    <Icon
                      onClick={() => {
                        deleteUser(u.id, dispatch);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Icon>
                    <Icon
                      onClick={() => {
                        setCurrentUser(u);
                        setVisibleEdit(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faUserEdit} />
                    </Icon>
                  </tr>
                );
              })
            : null}
        </Table>
        <Modal visible={visible} visibleEdit={visibleEdit} />

        {visible ? (
          <FormCont>
            <Close
              onClick={() => {
                setVisible(false);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faTimes} />
            </Close>{" "}
            <FormSpan>Criar Usuário</FormSpan>
            <Form>
              <LabelForm>Nome</LabelForm>
              <Input type="text" id="Nome" placeholder="Nome"></Input>
              <LabelForm>Login</LabelForm>
              <Input
                onChange={onChange}
                type="text"
                id="login"
                placeholder="Login"
                onBlur={onBlur}
              ></Input>
              <LabelForm>CPF</LabelForm>
              <Input type="text" id="CPF" placeholder="CPF"></Input>
              <LabelForm>Email</LabelForm>
              <Input type="text" id="Email" placeholder="E-mail"></Input>
              <LabelForm>AgentCode</LabelForm>
              <Input
                type="text"
                id="AgentCode"
                placeholder="Codigo de agente"
              ></Input>
              <Button
                disabled={!Login}
                onClick={(ev) => {
                  ev.preventDefault();

                  let user = {
                    Nome: document.getElementById("Nome").value,
                    login: document.getElementById("login").value,
                    CPF: document.getElementById("CPF").value,
                    Email: document.getElementById("Email").value,
                    AgentCode: document.getElementById("AgentCode").value,
                  };

                  saveUser(user, dispatch);
                }}
              >
                Enviar
              </Button>
            </Form>
          </FormCont>
        ) : null}
        {visibleEdit ? (
          <FormCont visible={visibleEdit}>
            <Close
              onClick={() => {
                setVisibleEdit(false);
                setCurrentUser({});
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faTimes} />
            </Close>{" "}
            <FormSpan>Editar Usuário</FormSpan>
            <Form>
              <LabelForm>Nome</LabelForm>
              <Input
                type="text"
                id="Nome"
                defaultValue={currentUser.Nome}
                placeholder="Nome"
              ></Input>
              <LabelForm>Login</LabelForm>
              <Input
                onChange={onChange}
                type="text"
                id="login"
                defaultValue={currentUser.login}
                placeholder="Login"
                onBlur={onBlur}
              ></Input>
              <LabelForm>CPF</LabelForm>
              <Input
                type="text"
                id="CPF"
                defaultValue={currentUser.CPF}
                placeholder="CPF"
              ></Input>
              <LabelForm>E-mail</LabelForm>
              <Input
                type="text"
                id="Email"
                defaultValue={currentUser.Email}
                placeholder="E-mail"
              ></Input>
              <LabelForm>AgentCode</LabelForm>
              <Input
                type="text"
                id="AgentCode"
                defaultValue={currentUser.AgentCode}
                placeholder="Codigo de agente"
              ></Input>
              <Button
                disabled={!Login}
                onClick={(ev) => {
                  ev.preventDefault();

                  let user = {
                    Nome: document.getElementById("Nome").value,
                    login: document.getElementById("login").value,
                    CPF: document.getElementById("CPF").value,
                    Email: document.getElementById("Email").value,
                    AgentCode: document.getElementById("AgentCode").value,
                  };

                  console.log(currentUser.AgentCode);
                  console.log(typeof currentUser.AgentCode);
                  editUser(user, currentUser.id, dispatch);
                }}
              >
                Enviar
              </Button>
            </Form>
          </FormCont>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
