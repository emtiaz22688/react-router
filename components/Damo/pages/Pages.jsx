import React from "react";
import { Link } from "react-router-dom";
import "./DemoCard.css";

const DemoCard = ({ title, image, link }) => {
  return (
    <Link to={link} className="demo-card">
      <img src={image} alt={title} className="demo-image" />
      <h3 className="demo-title">{title}</h3>
    </Link>
  );
};

export default DemoCard;
