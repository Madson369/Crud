import axios from "axios";
import { receive, clear } from "../actions/GetData";
import { result } from "../actions/ResultUser";
import { geterror } from "../actions/GetError";
import { login } from "../actions/GetLogin";

const api = axios.create({
  baseURL: `http://localhost:3333`,
});

async function getAllUsers(dispatch) {
  try {
    const response = await api.get(`/user`);

    dispatch(clear());
    dispatch(receive(response.data));

    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getUser(dispatch, id) {
  try {
    const response = await api.get(`/user/${id}`);
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function deleteUser(id, dispatch) {
  try {
    const response = await api.delete(`/user/${id}`);
    console.log(`Usuario ${id} deletado`);
    console.log(response.data);
    dispatch(result(response.data));
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function saveUser(info, dispatch) {
  try {
    const response = await api.post(`/user`, info);
    console.log(response.data);
    dispatch(result(response.data));
    return response;
  } catch (error) {
    console.error(error);
    console.log(error.response.data.error.message);
    dispatch(result(error));
    dispatch(geterror(error.response.data.error.message));
  }
}

async function editUser(info, id, dispatch) {
  try {
    console.log(info);
    const response = await api.put(`/user/${id}`, info);
    console.log(response.data);
    dispatch(result(response.data));
    return response;
  } catch (error) {
    console.error(error);
    dispatch(result(error));
    dispatch(geterror(error.response.data.error.message));
    console.log(error.response.data.error.message);
  }
}

async function getUserLogin(id, dispatch) {
  try {
    console.log(id);
    const response = await api.get(`/user/login/${id}`);
    dispatch(login(response.data));
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { getAllUsers, getUser, deleteUser, saveUser, editUser, getUserLogin };
