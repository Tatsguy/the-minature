import React from "react";

import { Link } from "react-router-dom";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import app from "../config/firebase";

const db = getFirestore(app);
const userId = localStorage.getItem("user");

export function timeStampToString(ts) {
  const date = new Date(ts * 1000);
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
}

const ArticleCard = (props) => {
  const handleDelete = async () => {
    const articleRef = doc(db, "Articles", props.data.id);
    await deleteDoc(articleRef);
  };
  return (
    <div className="article-card">
      <Link to={props.data.id} className="article-card-link">
        <img
          src={"https://picsum.photos/800/800?random=" + props.data.id}
          alt="killer mike"
          className="article-card-image"
        />
        <div className="article-card-content">
          <h2 className="article-card-title">{props.data.title}</h2>
          <div className="article-card-meta">
            <span className="article-card-date">
              {timeStampToString(props.data.createDate.seconds)}
            </span>
            <div className="article-card-categories">
              {props.data.categoryLabel.map((category, index) => (
                <span key={index} className="article-card-category">
                  {category}
                </span>
              ))}
            </div>
            <div className="article-card-author">
              <span>Por: {props.data.createUserID}</span>
            </div>
          </div>
        </div>
      </Link>
      {props.data.createUserID === userId && (
        <button onClick={handleDelete} className="delete-button">
          Eliminar
        </button>
      )}
    </div>
  );
};

export default ArticleCard;
