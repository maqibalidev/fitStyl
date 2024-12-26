import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  timeout: 5000,
});

const authHeader = (token, addContentType = false) => {
  return addContentType
    ? {
       "Content-Type": "multipart/form-data",
        Authorization: `bearer ${token}`,
      }
    : { Authorization: `bearer ${token}` };
};

export const loginApi = async (values) => {
  const res = await API.post("user/login", values);
  return res.data;
};

export const registerApi = async (values) => {
  return await API.post("user/register", values);
};

export const uploadExcel = async (values, token) => {
  return await API.post("user/upload", values, authHeader(token, true));
};

// export const logoutApi = async(token) => {
//   return API.post(
//     "logout",
//     {},
//     authHeader(token)}
//   );
// };
