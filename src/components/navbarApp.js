import logo from "../assets/Estrella_Logo.png";
import profile from "../assets/1054168-t.jpg";
import { HiMiniRectangleStack } from "react-icons/hi2";
import { FaCalendarDay } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa6";
import { FaMap } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { GoDesktopDownload } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
export default function NavbarApp() {
  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  return (
    <header className="toolbar">
      <div className="toolbar-content">
        <Link to="../" className="logoEditor">
          <img src={logo} className="logoApp" alt="LogoMinature" />
          <p>Minature</p>
        </Link>
      </div>
      <button className="fixed-profile">
        <div className="profile-content">
          <Link to={"../login"} className="returnBtn">
            <button className="transBtn" onClick={handleLogout}>
              <img
                alt="profile_photo"
                src={profile}
                className="rounded-profile"
              />
              <CiLogout className="iconoMini"/>
            </button>
          </Link>
        </div>
      </button>
      <nav className="navigation-drawer">
        <div className="navigation-drawer-content">
          <div className="tool-list">
            <a className="list-item" href="/">
              <HiMiniRectangleStack />
            </a>
            <a className="list-item" href="/">
              <FaCalendarDay />
            </a>
            <a className="list-item" href="/">
              <FaRegImage />
            </a>
            <a className="list-item" href="/">
              <FaMap />
            </a>
            <a className="list-item" href="/">
              <FaSearch />
            </a>
            <a className="list-item" href="/">
              <IoIosSettings />
            </a>
            <a className="list-item" href="/">
              <GoDesktopDownload />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
