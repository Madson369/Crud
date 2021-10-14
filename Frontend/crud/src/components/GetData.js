import axios from "axios";
import { receive, clear } from "../actions/GetData";
import { deleted } from "../actions/DeletedUser";

const api = axios.create({
  baseURL: `http://localhost:3000`,
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
    dispatch(deleted(response.data));
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function saveUser(info, dispatch) {
  try {
    console.log(info);
    const response = await api.post(`/user`, info);
    console.log(response.data);
    dispatch(deleted(response.data));
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function editUser(info, id, dispatch) {
  try {
    console.log(info);
    const response = await api.put(`/user/${id}`, info);
    console.log(response.data);
    dispatch(deleted(response.data));
    return response;
  } catch (error) {
    console.error(error);
    console.error(error.response);
  }
}

export { getAllUsers, getUser, deleteUser, saveUser, editUser };
