import React, { createContext, useContext, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const {dispatch,data} = useContext(AuthContext);
  const socket = useRef();

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:5000";
    socket.current = io(backendURL);

    socket.current.on("connect", () => {
    if(!data?.socketId){
      dispatch({type:"STORE_SOCKET_ID",payload:{socketId: Date.now() + Math.floor(Math.random() * 1000)}})
    }
    });

    socket.current.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = (s_id, r_id, msg) => {
    if (socket.current) {
      socket.current.emit("send_message", { s_id, r_id, msg });
    }
  };




  return (
    <SocketContext.Provider value={{ sendMessage,socket }}>
      {children}
    </SocketContext.Provider>
  );
};
