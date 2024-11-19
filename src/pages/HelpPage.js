import React, { Component } from "react";
import asist from "../assets/help-desk-support.png";
import Navbar from "../components/navbar.js";
class HelpPage extends Component {
  state = {};
  render() {
    return (
      <div className="bgPage">
        <Navbar />
        <div className="Landing">
          <h1>¿Necesitas ayuda?</h1>
          <p>
            Si necesita asistencia con Minature, por favor contáctenos en nuestro{" "}
            <a className="help-links" href="/">
              Mesa de Ayuda
            </a>{" "}
            o{" "}
            <a className="help-links" href="/">
              Foro
            </a>
            .
          </p>
          <img className="responsive-img" src={asist} alt="El metro"></img>
          <a className="btnColab" href="/">
            Contacta un colaborador
          </a>
        </div>
      </div>
    );
  }
}

export default HelpPage;
