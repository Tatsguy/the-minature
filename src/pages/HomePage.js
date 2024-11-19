import Navbar from "../components/navbar.js";
import logo from "../assets/Estrella_Logo.png";
import disp from "../assets/Displays.png";
import xday from "../assets/xday.jpeg";
import resources from "../assets/functions.png";
export default function HomePage() {
  return (
    <div className="bgPage">
      <Navbar />
      <div className="Landing">
        <img src={logo} alt="Logo" className="logoImg"/>
        <br/>
        <span className="headLand">Bienvenido a Minature</span>
        <br/>
        <span className="textLand">Recuerda todo, Disfruta Todo</span>
        <br/>
        <img src={disp} alt="Displays" className="responsive-img" />
      </div>
      <div className="contentLand">
        <p>
          Minature es una aplicación de diario que está disponible como
          aplicación web. Únete a millones de usuarios de Minature, de todos los
          ámbitos de la vida, para embarcarte en tu singular 'aventura' de vida
          hacia una gratitud más profunda por la vida, una mejor salud y una
          mente más tranquila a través del Diario.
        </p>
        <div className="section">
          <div className="row">
            <div className="col">
              <div className="card">
                <h3>Captura Tus Recuerdos</h3>
                <p>
                  Minature captura de manera elegante los hermosos momentos de
                  la vida. Te permite subir fotos, videos y audio, creando una
                  rica crónica multimedia de tus experiencias únicas y recuerdos
                  valiosos.
                </p>
                <div className="responsive-img">
                  <img className="img" src={xday} width={325} alt="El metro"></img>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <h3>Crear Impresionantes Posts</h3>
                <p>
                  Explora una variedad de herramientas de escritura en el editor
                  de Journey. Cambia el estilo del párrafo, estiliza tu texto
                  con negritas, cursivas y tachado, organiza tu escritura con
                  viñetas, tablas y listas de verificación, y juega con el color
                  del texto.
                </p>
                <div className="responsive-img">
                  <img className="img" src={resources} alt="Editor"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
