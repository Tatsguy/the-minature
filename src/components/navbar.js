export default function Navbar() {
  return (
    <div className="barra">
      <div className="barra-content">
        <div className="listaEle">
          <a className="btnNav" href="/">
            iNICIO
          </a>
          <a className="btnNav" href="help">
            aYUDA
          </a>
          <a className="btnNav" href={localStorage.getItem('user')?"app":"login"}>
            iR A LA APP
          </a>
        </div>
      </div>
    </div>
  );
}
