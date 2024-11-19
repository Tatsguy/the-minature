import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import logo from "../assets/Estrella_Logo.png";
import app from "../config/firebase";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore/lite";

const db = getFirestore(app);

export default function LoginDialog() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("usu", "==", email), where("pass", "==", password));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Usuario o contraseña incorrectos");
      } else {
        localStorage.setItem("user", JSON.stringify(email));
        navigate('/app');
        navigate(0);
        // Aquí puedes redirigir o mostrar contenido personalizado
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Hubo un error al iniciar sesión");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const usersRef = collection(db, "Users");

      // Verificar si el correo ya está registrado
      const q = query(usersRef, where("usu", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError("Este usuario ya está registrado");
        return;
      }

      // Registrar el nuevo usuario
      await addDoc(usersRef, { usu:email, pass:password });
      localStorage.setItem("user", JSON.stringify(email));
      navigate('/app');
      navigate(0);
    } catch (err) {
      console.error("Error al registrarse:", err);
      setError("Hubo un error al registrarse");
    }
  };

  return (
    <div className="backLogin">
      <div className="contentLogin">
        <Link to="/">        
          <img className="login-foto" src={logo} alt="Logo" width={120} />  
        </Link>
        <form className="formi" onSubmit={isRegistering ? handleRegister : handleLogin}>
          <label>Usuario</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <br/>
          <button type="submit" className="addBtn">
            {isRegistering ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>
        <p className="toggleText">
          {isRegistering
            ? "¿Ya tienes una cuenta? "
            : "¿No tienes cuenta aún? "}
          <button onClick={() => setIsRegistering(!isRegistering)} className="linkBtn">
            {isRegistering ? "Inicia Sesión" : "Regístrate"}
          </button>
        </p>
      </div>
    </div>
  );
}
