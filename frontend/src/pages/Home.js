import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log";
import { useSelector } from "react-redux";

function Home() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="home">
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>
      {uid ? (
        <div className="right-side">
          <div className="right-side-container">
            <div className="wrapper">
              <img src={userData.picture} alt="user-pic" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
