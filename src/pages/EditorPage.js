import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import imageResize from "quill-image-resize-module-react";
import app from "../config/firebase";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore/lite";
const db = getFirestore(app);
Quill.register("modules/imageResize", imageResize);

function EditorPage() {
  //Quill States
  const [code, setCode] = useState("");
  const [texto, setTexto] = useState("");
  const [longi, setLongi] = useState(1);

  //ArticleStates
  const id = useParams().id;
  const [article, setArticle] = useState({
    title: "",
    content: "",
    createDate: new Date(),
    isPublish: false,
    lastModified: new Date(),
    createUserID: localStorage.getItem("user"),
  });

  useEffect(() => {
    const getArticlesById = async (artId) => {
      const articleRef = doc(db, "Articles", artId);
      const articleSnap = await getDoc(articleRef);
      if (articleSnap.exists()) {
        setArticle(articleSnap.data());
        setCode(articleSnap.data().content);
      }
    };
    getArticlesById(id);
  }, [id]);

  const obtenerFechaLocal = () => {
    return moment().locale("es").format("LLLL");
  };

  function BotonSalida() {
    if (longi === 1) {
      return (
        <Link to={".."} className="returnBtn">
          <button className="transBtn">
            <IoMdArrowRoundBack className="iconoMini"/>
          </button>
        </Link>
      );
    } else {
      return (
        <Link to={".."} className="returnBtn">
          <button className="transBtn" onClick={saveArticle}>
            <FaCheckCircle className="iconoMini"/>
          </button>
        </Link>
      );
    }
  }

  function contEsp() {
    if (texto === "" || longi === 1) {
      return 0;
    } else {
      var spaceCount = texto.split(" ").length - 1;
      if (spaceCount === 0) return 1;
      else return spaceCount + 1;
    }
  }
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  const handleProcedureContentChange = (content, delta, source, editor) => {
    setLongi(editor.getLength());
    setCode(content);
    setTexto(editor.getText());
  };

  const saveArticle = async () => {
    try {
      let titulo;
      if (longi > 13) {
        titulo = texto.substring(0, 12);
      } else {
        titulo = texto;
      }
      const newArticle = {
        ...article,
        content: code,
        lastModified: new Date(),
        title: titulo,
        createUserID: localStorage.getItem("user"),
      };
      if (id !== "editor") {
        // Si el documento ya existe, lo actualizamos
        const articleRef = doc(db, "Articles", id);
        await setDoc(articleRef, newArticle);
      } else {
        // Si no existe, creamos un nuevo documento
        const collectionRef = collection(db, "Articles");
        const docRef = await addDoc(collectionRef, {
          ...newArticle,
          createDate: new Date(),
          categoryLabel: ["Dolor"],
          createUserID: localStorage.getItem("user"),
        });
        console.log("Nuevo documento creado con ID:", docRef.id);
      }
    } catch (error) {
      console.error("Error al guardar el artículo:", error);
    }
  };

  return (
    <div className="application">
      <div className="application-wrap">
        <header className="toolbar">
          <div className="toolbar-content">
            <BotonSalida />
            <div className="text-center mx-auto mt-small">
                <span className="reloj">{obtenerFechaLocal()}</span>
            </div>
          </div>
        </header>
        <main className="main-app">
          <div className="embed-container">
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={code}
              readOnly={
                localStorage.getItem("user") === article.createUserID
                  ? false
                  : true
              }
              onChange={handleProcedureContentChange}
            />
          </div>
          <footer className="footer">
            <div className="carrousel-container">
              <div className="carrousel">
                <div className="carrousel-item mx-auto">
                  <span className="counter">
                    Palabras {contEsp()} | Caracteres {longi - 1}
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default EditorPage;
