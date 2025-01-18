import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  // baseURL:"http://192.168.0.106:8000/api/v1/",
  timeout: 30000,
});

const authHeader = (token, addContentType = false) => {
  return addContentType
    ? {
       "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      }
    : { "Authorization": `Bearer ${token}`};
};

export const loginApi = async (values) => {
  const res = await API.post("auth/login", values);
  return res.data;
};

export const registerApi = async (values) => {
  return await API.post("auth/register", values);
};


export const registerWithGoogleApi = async (values) => {
  return await API.post("auth/firebase/register", values);
};

export const getFlashProducts = async (offset = null, limit = null, id = null) => {

  const params = new URLSearchParams();

  if (limit !== null) params.append("limit", limit);
  if (offset !== null) params.append("offset", offset);
  if (id !== null) params.append("id", id);

  const url = `product${params.toString() ? `?${params.toString()}` : ""}`;

  const res = await API.get(url);
  return res.data;
};

export const getCategories = async () => {
  const res= await API.get("/category");
    return res.data;
 };
 export const getBanner = async (priority) => {
  const res= await API.get(`/banner${priority ? "?priority="+priority:""}`);
    return res.data;
 };

 export const forgetPass = async (email) => {
  const res= await API.post("auth/forgot-password",{ email });
    return res.data;
 };

 export const resetPass = async (values) => {
  const res= await API.post("auth/reset-password",values);
    return res.data;
 };

 export const getUser = async (token) => {
  const res = await API.get("auth", { headers: authHeader(token, false) });
  return res.data;
};
export const updateUser = async (values,token) => {
  const res = await API.post("auth/update",values,{headers: authHeader(token, false)});
  return res.data;
};

export const verifyUser = async (values,token) => {
  const res = await API.post("auth/verify-user",values,{headers: authHeader(token, false)});
  return res.data;
};

export const verifyApi = async (token) => {
  const res = await API.post("auth/verify",token);
  return res.data;
};
export const getMessages = async (id) => {
  const res = await API.get(`chat?s_id=${id}`);
  return res.data;
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
