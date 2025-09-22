import "../mystyle.scss";
import { DarkModeContext } from "../context/DarkModeContext";
import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function Header() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };
  return (
    <>
      <div className="row">
        <button id="toggleDarkMode" onClick={handleToggleDarkMode}>
          {darkMode ? <FaSun size={20} color="white"/> : <FaMoon size={20} color="black"/>}
        </button>
      </div>
    </>
  );
}

export default Header;
