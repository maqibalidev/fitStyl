import React, { createContext, useReducer } from "react";

const initialState = JSON.parse(localStorage.getItem("user")) || {
  id: null,
  socketId:null,
  username: null,
  email: null,
  authToken: null,
  darkMode: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { user, authToken } = action.payload;
      initialState.id = user.id;
      initialState.username = user.username;
      initialState.email = user.email;
      initialState.authToken = authToken;
      localStorage.setItem("user", JSON.stringify(initialState));
      return { ...state, id:user.id, username:user.username, authToken };

      case "STORE_SOCKET_ID":
          const { socketId } = action.payload;
          initialState.socketId = socketId;
          localStorage.setItem("user", JSON.stringify(initialState));
          return { ...state, socketId};

    case "LOGOUT":
      delete initialState.id;
      delete initialState.username;
      delete initialState.email;
      delete initialState.authToken;
      localStorage.setItem("user", JSON.stringify(initialState));
      return { ...state, id: null, username: null,email:null, authToken: null };

    default: return state;
  }
};

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ data: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
