import "./App.css";
import {
  getUser,
  getAllUsers,
  deleteUser,
  saveUser,
  editUser,
} from "./components/GetData";
import { Input } from "./components/atoms/ItemInput.styles";
import { Td } from "./components/atoms/Td.styles";
import { Th } from "./components/atoms/Th.styles";
import { Close } from "./components/atoms/X.styles";
import { Table } from "./components/atoms/table.styles";
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
  let deleted = useSelector((state) => state.deleted);

  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getAllUsers(dispatch);
  }, []);

  useEffect(() => {
    getAllUsers(dispatch);
  }, [deleted]);

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
            <span>Criar usuario</span>
            <Form action="http://localhost:3000/user" method="POST">
              <label>Nome</label>
              <Input type="text" id="Nome" placeholder="Nome"></Input>
              <Input type="text" id="login" placeholder="Login"></Input>
              <Input type="text" id="CPF" placeholder="CPF"></Input>
              <Input type="text" id="Email" placeholder="E-mail"></Input>
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

                  console.log(user);
                  // let userJson = JSON.stringify(user);

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
            <Form action="http://localhost:3000/user" method="POST">
              <label>Nome</label>
              <Input
                type="text"
                id="Nome"
                defaultValue={currentUser.Nome}
                placeholder="Nome"
              ></Input>
              <Input
                type="text"
                id="login"
                defaultValue={currentUser.login}
                placeholder="Login"
              ></Input>
              <Input
                type="text"
                id="CPF"
                defaultValue={currentUser.CPF}
                placeholder="CPF"
              ></Input>
              <Input
                type="text"
                id="Email"
                defaultValue={currentUser.Email}
                placeholder="E-mail"
              ></Input>
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
