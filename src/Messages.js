import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Messages() {
  const fetchFlag2 = async (e) => {
    try {
      await axios.post(
        "https://pneuexpress.online/tanglee/flagTrue.php",
        {
          email: localStorage.getItem("userEmail"),
        },
      );
      ////(response.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFlag2();
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
  const [messages, setMessages] = useState(null);

  const fetchAllMessages = async (emailOrNumber) => {
    try {
      const res = await axios.post(
        "https://pneuexpress.online/tanglee/getAllUserMessages.php",
        {
          emailOrNumber: emailOrNumber,
        },
      );
      //(res.data.messages)
      setMessages(res.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchAllMessages(localStorage.getItem("userEmail"));
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          fontWeight: "bold",
          justifyContent: "center",
          backgroundColor: "rgba(255,150,150,0.2)",
          overflowY: "scroll",
          color: "#fff",
          padding: "20px",
        }}
      >
        Messages
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {messages &&
          messages.map((elm, index) => (
            <Link to={`/chat/${elm.otherUserId}`} key={index}>
              <div
                style={{ margin: "5px", display: "flex", alignItems: "center" }}
              >
                <img
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  src={
                    elm.imageName
                      ? `https://pneuexpress.online/tanglee/uploads/${elm.imageName}`
                      : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                  }
                  width={50}
                  height={50}
                  alt={`${elm.id}`}
                />

                <div
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginLeft: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span style={{ fontSize: "1.1em" }}>
                    {elm.messageContent || "No message"}
                  </span>
                  <span style={{ fontSize: "0.6em" }}>
                    {elm.messageTime
                      ? formatTime(elm.messageTime)
                      : ""}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>

      <div
        style={{
          zIndex: "6000",
          background:
            "linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))",
          padding: "20px",
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
          <i className="fa-solid fa-house"></i>
        </Link>
        <Link to="/views">
          <i className="fa-solid fa-eye"></i>
        </Link>
        <Link to="/favourite">
          <i className="fa-solid fa-star"></i>
        </Link>
        <Link to="/like">
          <i style={{ color: "white" }} className="fa-solid fa-heart"></i>
        </Link>
        <Link to="/messages">
          <i className="fa-solid fa-message"></i>
        </Link>
        <Link to="/personalInfo">
          <i className="fa-solid fa-user"></i>
        </Link>
      </div>
    </div>
  );
}

export default Messages;
