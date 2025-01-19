import React, { useContext, useEffect, useRef, useState } from "react";
import "./contact.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/fs_logo.low.webp";
import {
  Footer,
  Header,
  CallIcon,
  MailIcon,
  SendIcon,
  AuthContext,
} from "../includes/imports";
import { useSocket } from "../../contexts/socketContext";
import { getMessages } from "../../services/userListingsApi";
import { handleApiError } from "../../helpers/errorHandler";
import moment from "moment";

const Contact = () => {
  const { sendMessage, socket } = useSocket();
  const { data } = useContext(AuthContext);
const id = data?.id ? data.id : data?.socketId; 
  const [msgData, setMsgData] = useState([]);
  const [messageText, setMsgText] = useState("");
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Listener for receiving messages
    if (socket.current) {
      const receiveMessageHandler = () => {
        getMsg(); // Fetch updated messages
        scrollToBottom(); // Scroll after the message is added
      };

      socket.current.on(`receive_${id}_message`, receiveMessageHandler);

      return () => {
        socket.current.off(`receive_${id}_message`, receiveMessageHandler);
      };
    }
  }, [socket, id]);

  const getMsg = () => {
    console.log(id)
    getMessages(id)
      .then((res) => {
        setMsgData(res);
      })
      .catch((err) => {
        handleApiError(err);
      });
  };

  const handleSendMessage = (event) => {
    event.preventDefault()
    if (messageText.trim()) {
      sendMessage(id, 2, messageText);
      setMsgText(""); // Clear input
    }
  };

  // Trigger scroll when messages are updated
  useEffect(() => {
    scrollToBottom();
  }, [msgData]);

  useEffect(() => {
    getMsg();
  }, []);

  return (
    <div className="d-flex flex-column vh-100 justify-content-between">
      <Header activePage="contact" />
      <div className="custom-container mx-auto py-2 my-md-5">
        <div className="row">
          <div className="col-12 px-4 col-md-3 d-flex flex-row flex-sm-column my-3 gap-3 justify-content-center my-md-auto ">
            <div className="d-flex flex-column gap-3">
              <Link to="tel:+923207043815" className="d-flex gap-2 align-items-center bg-light shadow-sm p-3 rounded-2 ">
                <span className="p-2 rounded-circle bg-color-orange lh-1 mb-0 text-light ">
                  <CallIcon />
                </span>{" "}
                <h6 className="mb-0">Call To Us</h6>
              </Link>

            </div>
            <div className="d-flex flex-column gap-3">
              <Link to="mailto:maqibali608@gmail.com" className="d-flex gap-2 align-items-center bg-light shadow-sm p-3 rounded-2 ">
                <span className="p-2 rounded-circle mb-0 bg-color-orange lh-1 text-light">
                  <MailIcon />
                </span>{" "}
                <h6 className="mb-0">Mail To Us</h6>
              </Link>
            </div>
          </div>
       
            <div className="col-12 col-md-9 contact-right  shadow-normal rounded-2 position-relative px-0">
              <div className="chat-container d-flex flex-column h-100 p-3" ref={chatContainerRef}>
                <div className="chatting-sec ">
                  <div className="position-relative">
                {msgData && msgData?.data?.length > 0 ? msgData.data.map((item,index)=>(
                  <>
                  {
                    item.receiver_id != id ? 
                    <div key={index} className={`contact-message  my-2 w-100`}>
                    <div className="p-2 d-flex align-items-center justify-content-center contact-msg-profile rounded-circle bg-dark text-light">
                      Me
                    </div>
                    <div className="contact-msg-text text-light d-flex flex-column rounded-bottom-2 rounded-end-2 lh-2 p-2 mt-2 ms-2">
                    {item.message}
                    <span className="d-flex justify-content-end mt-1 contact-msg-time ">{moment(item.timestamp).fromNow()}</span>
                    </div>
                  </div>
                  :
                  <div key={index} className={`contact-message my-2  w-100 float-end d-flex flex-column align-items-end`}>
                  <div className="p-2 d-flex align-items-center justify-content-center contact-msg-profile rounded-circle bg-dark text-light">
                    <img src={logo} alt="" />
                  </div>
                  <div className="contact-admin-msg-text text-light  d-flex flex-column rounded-bottom-2 rounded-start-2 lh-2 p-2 mt-2 ms-2">
                    {item.message}
                    <span className="d-flex justify-content-end mt-1 contact-msg-time ">{moment(item.timestamp).fromNow()}</span>
                  </div>
                </div>
                  }
                  </>
                )):   <div  className={`contact-message my-2  w-100 float-end d-flex flex-column align-items-end`}>
                <div className="p-2 d-flex align-items-center justify-content-center contact-msg-profile rounded-circle bg-dark text-light">
                  <img src={logo} alt="" />
                </div>
                <div className="contact-admin-msg-text text-light  d-flex flex-column rounded-bottom-2 rounded-start-2 lh-2 p-2 mt-2 ms-2">
                  How can i help u?
                  <span className="d-flex justify-content-end mt-1 contact-msg-time ">{moment(Date.now()).fromNow()}</span>
                </div>
              </div>}
                  </div>

                  {/* {data && data.length>0 && data.data.map((item, key) => (
                    <div key={key} className=" float-end my-2">
                      <div className="contact-message d-flex flex-column align-items-end">
                        <div
                          className="p-2 d-flex align-items-center justify-content-center contact-msg-profile rounded-circle bg-dark text-light "
                        >
                          <img src={logo} alt="" height={40} width={40} />
                        </div>
                        <div className="contact-admin-msg-text w-75 text-light rounded-bottom-2 rounded-start-3 lh-2 p-2 mt-2 ms-2">
                          Lorem ipsum asdas asd asd asd asd as dasd ad dolor sit
                          amet.
                        </div>
                      </div>
                    </div>
                  ))} */}
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="form position-absolute   d-flex bottom-0 start-0 end-0 mx-auto  z-1 p-2">
                <input
                  className="form-control py-2 px-3 shadow-none rounded-5"
                  type="text"
                  value={messageText}
                  onChange={(e)=>{setMsgText(e.target.value)}}
                  placeholder="Type a message"
                />
                <div
                  onClick={handleSendMessage}
                  className="btn btn-success contact-send-msg-btn lh-1 m-0  d-flex justify-content-center align-items-center border-0 bg-color-green rounded-circle ms-2 contact-msg-send-btn"
                >
                  <SendIcon />
                </div>
              </form>
            </div>
        
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
