import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";
import "./Contact.css";
const Contact = ({ contacts, currentUser, changeChat }) => {
  // console.log(contacts);
  const [userDetails, setUserDetails] = useState({
    username: undefined,
    userimage: undefined,
    selected: undefined,
  });
  useEffect(() => {
    if (currentUser) {
      setUserDetails((prevdetails) => ({
        ...prevdetails,
        username: currentUser.username,
        userimage: currentUser.avatarImage,
      }));
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setUserDetails({ ...userDetails, selected: index });
    changeChat(contact);
  };
  return (
    <>
      {userDetails.username && userDetails.userimage ? (
        <>
          <div
            className="brand-imgContainer "
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              width: "100%",
              height: "4rem",
            }}
          >
            <img src={Logo} alt="logo" className="img-logo" />
            <h3
              style={{
                color: "whitesmoke",
                textTransform: "uppercase",
                fontWeight: "400",
              }}
            >
              snappy
            </h3>
          </div>
          <div
            className="contacts"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              height: "65%",
              overflowY: "scroll",
            }}
          >
            {contacts.map((contact, index) => {
              return (
                <div
                  className={` ${
                    index === userDetails.selected ? "selected" : "contact-list"
                  } `}
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "1rem",
                    borderRadius: "3px",
                    minHeight: "5rem",
                    width: "95%",
                    cursor:"pointer",
                  }}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                    className="friendAvatar"
                    style={{
                      paddingLeft: "4px",
                    }}
                  />

                  <span
                    style={{ color: "whitesmoke", fontWeight: "500" }}
                    className="contact-username"
                  >
                    {" "}
                    {contact.username}
                  </span>
                </div>
              );
            })}
          </div>
          <div
            className="current-user-contact"
            style={{
              // backgroundColor: "#ffffff39",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              borderRadius: "3px",
              height: "4rem",
              width: "95%",
            }}
          >
            <img
              src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
              alt="avatar"
              className="friendAvatar"
              style={{
                paddingLeft: "4px",
              }}
            />
            <span
              style={{ color: "whitesmoke", fontWeight: "500" }}
              className="contact-username"
            >
              {" "}
              {userDetails.username}
            </span>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Contact;
