import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty, timeStampParser } from "../Utils";

function NewPostForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState("");
  const userData = useSelector((state) => state.userReducer);
  
  const handlePost = () => {};

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture(null);
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <NavLink exact to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="Utilisateur" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Écrire votre post"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="Utilisateur" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <h3>{userData.pseudo}</h3>
                  </div>
                  <span>{timeStampParser(Date.now())}</span>
                </div>
                <div className="content">
                  <p>{message}</p>
                  <img src={postPicture} alt="Preview" />
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                <img src="./img/icons/picture.svg" alt="Illustrer le message" />
                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handlePicture(e)}
                />
              </div>
              <div className="btn-send">
                {message || postPicture ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default NewPostForm;
