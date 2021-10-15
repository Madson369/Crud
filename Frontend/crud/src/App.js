import "./App.css";
import {
  getUser,
  getAllUsers,
  deleteUser,
  saveUser,
  editUser,
  getUserLogin,
} from "./components/GetData";
import { Input } from "./components/atoms/ItemInput.styles";
import { Td } from "./components/atoms/Td.styles";
import { Th } from "./components/atoms/Th.styles";
import { Close } from "./components/atoms/X.styles";
import { LabelForm } from "./components/atoms/Label.styles";
import { Table } from "./components/atoms/table.styles";
import { FormSpan } from "./components/atoms/TextForm.styles";
import { AddButton } from "./components/atoms/AddUser.styles";
import { Button } from "./components/atoms/SendButton.styles";
import { Form } from "./components/atoms/Form.styles";
import { Icon } from "./components/atoms/Icon.styles";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faUserPlus,
  faTimes,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

function App() {
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
  }, [result]);

  const onChange = (event) => {
    setEvento(event.target.value);
    console.log(evento);
  };

  const onBlur = () => {
    console.log(evento);
    if (evento.length > 0) {
      getUserLogin(evento, dispatch);
      console.log(Login);
      console.log(typeof Login);
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
                        console.log(currentUser);
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
        {visible ? (
          <div className="form_container">
            <Close
              onClick={() => {
                setVisible(false);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faTimes} />
            </Close>{" "}
            <FormSpan>Criar Usuário</FormSpan>
            <Form
              action="http://localhost:3000/user"
              autocomplete="off"
              method="POST"
            >
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
          </div>
        ) : null}

        {visibleEdit ? (
          <div className="form_container">
            <Close
              onClick={() => {
                setVisibleEdit(false);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faTimes} />
            </Close>{" "}
            <FormSpan>Editar Usuário</FormSpan>
            <Form
              action="http://localhost:3000/user"
              autocomplete="off"
              method="POST"
            >
              <LabelForm>Nome</LabelForm>
              <Input
                type="text"
                id="Nome"
                defaultValue={currentUser.Nome}
                placeholder="Nome"
              ></Input>
              <LabelForm>Login</LabelForm>
              <Input
                type="text"
                id="login"
                defaultValue={currentUser.login}
                placeholder="Login"
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
                onClick={(ev) => {
                  ev.preventDefault();

                  let user = {
                    Nome: document.getElementById("Nome").value,
                    login: document.getElementById("login").value,
                    CPF: document.getElementById("CPF").value,
                    Email: document.getElementById("Email").value,
                    AgentCode: document.getElementById("AgentCode").value,
                  };

                  console.log(user);
                  // let userJson = JSON.stringify(user);

                  editUser(user, currentUser.id, dispatch);
                }}
              >
                Enviar
              </Button>
            </Form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
