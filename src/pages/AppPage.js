import React, { useState, useEffect } from "react";
import NavbarApp from "../components/navbarApp";
import { Outlet, Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import app from "../config/firebase";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import ArticleCard from "../components/ArticleCard";

const db = getFirestore(app);

const AppPage = () => {
  const userId= localStorage.getItem("user");
  const [articles, setArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("all"); // Estado para el filtro
  useEffect(() => {
    const articlesCol = collection(db, "Articles");
    const unsubscribe = onSnapshot(articlesCol, (snapshot) => {
      const articleList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articleList);
      setIsLoaded(true);
    });
    return () => unsubscribe();
  }, []);
  const filteredArticles = articles.filter((article) => {
    if (filter === "mine") {
      return article.createUserID === userId;
    } else {
      return true;
    }
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="frame-container">
        <NavbarApp />
        <main className="main-app">
          <div className="app-container">
            <div className="mx-auto">
              <div className="d-flex">
                <h3>Aventuras</h3>
                <div className="filter-buttons">
                  <button onClick={() => setFilter("all")}>Todos</button>
                  <button onClick={() => setFilter("mine")}>
                    Mis Aventuras
                  </button>
                </div>
              </div>
            </div>
            <div className="text-medium-emphasis">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} data={article} />
              ))}
            </div>
          </div>
        </main>
        <div className="text-end">
          <Link to={"editor"}>
            <button className="addBtn">
              <FaPlus className="iconoMini" /> <span className="textoMovil">Nueva</span>
            </button>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AppPage;
