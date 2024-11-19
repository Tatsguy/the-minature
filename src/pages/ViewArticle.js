import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ViewArticle(){
  //Quill States
  const [code, setCode] = useState("");
  const [texto, setTexto] = useState("");
  const [longi, setLongi] = useState(1);

  const obtenerFechaLocal = () => {
    return moment().locale("es").format("LLLL");
  };

  function BotonSalida() {
    if (longi===1) {
      return (
        <Link to={".."} className="returnBtn">
          <button className="transBtn">
            <IoMdArrowRoundBack />
          </button>
        </Link>
      );
    } else{
      return (
        <Link to={".."} className="returnBtn">
          <button className="transBtn" onClick={""}>
            <FaCheckCircle />
          </button>
        </Link>
      );
    }
  }

  function contEsp() {
    if (texto==="" || longi===1) {
      return (0);
    } else{
      var spaceCount = texto.split(" ").length - 1;
      if(spaceCount===0) return (1);
      else return (spaceCount+1);
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
    setTexto(editor.getText())
  };

  return (
    <div className="application">
      <div className="application-wrap">
        <header className="toolbar">
          <div className="toolbar-content">
            <BotonSalida />
            <div className="text-center mx-auto mt-small">
              <button>
                <span className="reloj">{obtenerFechaLocal()}</span>
              </button>
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
              onChange={handleProcedureContentChange}
            />
          </div>
          <footer className="footer">
            <div className="carrousel-container">
              <div className="carrousel">
                <div className="carrousel-item mx-auto">
                  <span className="counter">Porno Gay {contEsp()} | Caracteres {longi-1}</span>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

/*const addArticle = async (e) => {
  e.preventDefault();

  try {
    const docRef = await addDoc(collection(db, "todos"), {
      todo: { tit: "Primer Arti", desc: "Aprendiendo a añadir" },
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};*/

export default ViewArticle;
