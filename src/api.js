import axios from 'axios';
import {
  BASE_API_URL,
  UPDATE_PASSWORD,
  ADD_CLAIM,
  GET_MY_CLAIMS,
  GET_EVENTS,
  GET_MY_CHILDRENS,
  GET_CHILDREN_SUBJECTS,
  SAVE_TOKEN_DEVICE,
} from './Constant';

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});
const saveTokenDevice = (id, object, AuthorizationToken) =>
  axiosInstance.post(`${SAVE_TOKEN_DEVICE}${id}`, object, {
    headers: {
      Authorization: 'Bearer ' + AuthorizationToken,
    },
  });
const changePassword = (id, object, AuthorizationToken) =>
  axiosInstance.post(`${UPDATE_PASSWORD}${id}`, object, {
    headers: {
      Authorization: 'Bearer ' + AuthorizationToken,
    },
  });
const addClaim = (object, AuthorizationToken) =>
  axiosInstance.post(`${ADD_CLAIM}`, object, {
    headers: {
      Authorization: 'Bearer ' + AuthorizationToken,
    },
  });
const getMyClaims = (id, AuthorizationToken) =>
  axiosInstance.get(`${GET_MY_CLAIMS}${id}`, {
    headers: {
      Authorization: 'Bearer ' + AuthorizationToken,
    },
  });
const getAllEvents = AuthorizationToken =>
  axiosInstance.get(`${GET_EVENTS}`, {
    headers: {
      Authorization: 'Bearer ' + AuthorizationToken,
    },
  });
const getMyChildrens = (id, AuthorizationToken) =>
  axiosInstance.get(`${GET_MY_CHILDRENS}${id}`, {
    headers: {
      Authorization: 'Bearer ' + AuthorizationToken,
    },
  });
const getChildrenSubjects = (id, AuthorizationToken) =>
  axiosInstance.get(`${GET_CHILDREN_SUBJECTS}${id}`, {
    headers: {
      Authorization: 'Bearer ' + AuthorizationToken,
    },
  });
export {
  changePassword,
  addClaim,
  getMyClaims,
  getAllEvents,
  getMyChildrens,
  getChildrenSubjects,
  saveTokenDevice
};
