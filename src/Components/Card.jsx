import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ModelContext"; 

const Card = (props) => {
  const { theme } = useTheme(); 
  const loggedInUserData = JSON.parse(localStorage.getItem("loginData")) || {};
  const navigate = useNavigate();

  const desc = props.desc || "";

  return (
    
    <div className={`card ${theme}`}>
      <div className="card-content" onClick={props.onRedirect}>
        <div className="img-box">
          <img src={props.image || "https://via.placeholder.com/150"} alt="post" />
        </div>

        <h2 className="card-title">{props.title || "No Title"}</h2>

        <p className="card-desc">
          {desc.length > 90 ? desc.substring(0, 90) + "..." : desc}
        </p>
      </div>

      {loggedInUserData?.role === "admin" && (
        <div className="button">
          <button className="btn-del" onClick={props.onDelete}>Delete</button>
          <button className="btn edt" onClick={props.onEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Card;
