import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";



function Chat() {
  const me = useRef(null);
  function scrollToBottom() {
    me.current.scrollTop = me.current.scrollHeight;
  }

  useEffect(() => {
    if (me.current) {
      const observer = new MutationObserver(scrollToBottom);
      observer.observe(me.current, {
        childList: true,
        subtree: false,
      });

      return () => observer.disconnect();
    }
  }, []);
  function formatTime(datetimeString) {
  const inputDate = new Date(datetimeString);
  const now = new Date();

  const isToday = inputDate.toDateString() === now.toDateString();

  // Format time (12-hour with AM/PM)
  const timeString = inputDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) {
    return `${timeString} today`;
  }

  const day = inputDate.getDate();

  const suffix =
    day % 10 === 1 && day % 100 !== 11
      ? "st"
      : day % 10 === 2 && day % 100 !== 12
        ? "nd"
        : day % 10 === 3 && day % 100 !== 13
          ? "rd"
          : "th";

  const month = inputDate.toLocaleString("en-US", {
    month: "long",
  });

  return `${timeString} ${month} ${day}${suffix}`;
}

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [messages, setMessages] = useState(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [currentUserImages, setCurrentUserImages] = useState(null);

  const [userImages2, setUserImages2] = useState(null);

  

  useEffect(() => {
    const fetchData = async () => {
    try {
      // 1. Get Other User's Data
      const userDataRes = await axios.post(
        "https://pneuexpress.online/tanglee/getUserData.php",
        { id },
      );
      setData(userDataRes.data);

      //(userDataRes.data);
      // 2. Get Other User's Images
      const userImagesRes = await axios.post(
  "https://pneuexpress.online/tanglee/getUserImages.php",
  {
    id: parseInt(id),
  }
);
//(userImagesRes.data)

      setUserImages2(userImagesRes.data);
      // // 3. Get Current User's Data
      const userEmail = localStorage.getItem("userEmail");
      const currentUserRes = await axios.post(
        "https://pneuexpress.online/tanglee/getUserData.php",
        { email: userEmail },
      );
      const currentUserData = currentUserRes.data;
      setData2(currentUserData);

      // // 4. Get Current User's Images
      const currentUserImagesRes = await axios.post(
        "https://pneuexpress.online/tanglee/getUserImages.php",
        { id: currentUserData.id },
      );

      setCurrentUserImages(currentUserImagesRes.data);
    } catch (error) {
      console.error("Error in fetching user data:", error);
    }
  };
    if (id) fetchData();
  }, [id]);
  const fetchMessages = async (id_res, id_send) => {
    try {
      const messagesRes = await axios.post(
        "https://pneuexpress.online/tanglee/getMessages.php",
        {
          idOne: parseInt(id_res), // Replace with actual logic
          idTwo: id_send,
        },
      );
      setMessages(messagesRes.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  useEffect(() => {
  if (id && data && data2?.id) {
    fetchMessages(id, data2.id);
  }
}, [data2, data, id]);

  useEffect(() => {
    if (data != null) setName(data.name);
  }, [data]);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        await axios.post(
          "https://pneuexpress.online/tanglee/addMsg.php",
          {
            id_res: parseInt(id), // Receiver ID from route or state
            id_send: data2.id, // Sender ID (current user)
            content: message.trim(), // Cleaned message
          },
        );

        // Optional: Clear input after sending
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

 useEffect(() => {
  if (!id || !data || !data2?.id) return;

  const interval = setInterval(() => {
    fetchMessages(id, data2.id);
  }, 2000);

  return () => clearInterval(interval);
}, [id, data, data2]);

  return (
    <>
      <div
        style={{
          display: "flex",
          fontWeight: "bold",
          justifyContent: "space-between",
          backgroundColor: "rgba(255,150,150,0.2)",
          color: "#fff",
          padding: "20px",
        }}
      >
        <Link to="/main">
          <i style={{ color: "white" }} className="fa-solid fa-arrow-left"></i>
        </Link>
        <span>Chat with : {data && name}</span>
      </div>

      <div
        ref={me}
        style={{
          paddingBottom: "30px",
          maxHeight: "500px",
          overflowY: "scroll",
          positon: "relative",
          display: "flex",
          flexDirection: "column",
          color: "white",
        }}
      >
        {messages &&
          userImages2 &&
          currentUserImages &&
          messages.map((elm, index) =>
            elm.id_sender !== data2.id ? (
              <div
                style={{
                  display: "flex",
                  margin: "5px 0",
                  alignItems: "center",
                }}
                key={elm.id}
              >
                <img
                  width="50"
                  height="50"
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginRight: "5px",
                  }}
                  src={
                    userImages2 && userImages2.images[0]?.name
                      ? `https://pneuexpress.online/tanglee/uploads/${userImages2.images[0].name}`
                      : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                  }
                  alt={`${elm.id}`}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "red",
                      padding: "10px 20px",
                      borderRadius: "25px",
                    }}
                  >
                    {elm.messageContent}
                  </span>
                  <span style={{ fontSize: "0.6em" }}>
                    {formatTime(elm.messageTime)}
                  </span>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  margin: "5px 0",
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                key={elm.id}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "pink",
                      padding: "10px 20px",
                      borderRadius: "25px",
                    }}
                  >
                    {elm.messageContent}
                  </span>
                  <span style={{ fontSize: "0.6em" }}>
                    {formatTime(elm.messageTime)}
                  </span>
                </div>
                <img
                  width="50"
                  height="50"
                  style={{
                    marginLeft: "10px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  src={
                    currentUserImages?.name
                      ? `https://pneuexpress.online/tanglee/uploads/${currentUserImages.name}`
                      : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                  }
                  alt={`${elm.id}`}
                />
              </div>
            ),
          )}
        <div
          style={{
            color: "white",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "none",
            outline: "none",
            bottom: "60px",
            width: "100%",
            height: "70px",
            position: "absolute",
            backgroundColor: "#ee304a",
          }}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "85%",
              fontSize: "1.4em",
              color: "white",
              backgroundColor: "#ee304a",
              outline: "none",
              border: "none",
            }}
          ></textarea>
          <i
            onClick={sendMessage}
            style={{
              color: "white",
              position: "absolute",
              bottom: "30px",
              right: "25px",
              fontSize: "1.3em",
            }}
            className="fa-solid fa-paper-plane"
          ></i>
        </div>
      </div>

      <div
        style={{
          background:
            "linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))",
          padding: "20px",
          zIndex: "20000",
          position: "fixed",
          width: "100%",
          left: "0",
          right: "0",
          bottom: "0px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Link to="/main">
          <i style={{ color: "white" }} className="fa-solid fa-house"></i>
        </Link>
        <Link to="/views">
          <i className="fa-solid fa-eye"></i>
        </Link>
        <Link to="/favourite">
          <i className="fa-solid fa-star"></i>
        </Link>
        <Link to="/like">
          <i className="fa-solid fa-heart"></i>
        </Link>
        <Link to={`/messages`}>
          <i className="fa-solid fa-message"></i>
        </Link>
        <Link to="/personalInfo">
          <i className="fa-solid fa-user"></i>
        </Link>
      </div>
    </>
  );
}

export default Chat;
