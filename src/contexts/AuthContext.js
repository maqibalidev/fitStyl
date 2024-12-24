import React, { createContext, useReducer } from "react";

const initialState = JSON.parse(localStorage.getItem("user")) || {
  id: null,
  name: null,
  email: null,
  authToken: null,
  darkMode: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { name, email, id, authToken } = action.payload;
      initialState.id = id;
      initialState.name = name;
      initialState.email = email;
      initialState.authToken = authToken;
      localStorage.setItem("user", JSON.stringify(initialState));
      return { ...state, id, name, email, authToken };

    case "LOGOUT":
      delete initialState.id;
      delete initialState.name;
      delete initialState.email;
      delete initialState.authToken;
      localStorage.setItem("user", JSON.stringify(initialState));
      return { ...state, id: null, name: null, email: null, authToken: null };

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
