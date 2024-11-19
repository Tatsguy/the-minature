import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./styles/gens.css";
import "./styles/comps.css";
import Home from "./pages/HomePage";
import HelpPage from "./pages/HelpPage";
import AppPage from "./pages/AppPage";
import EditorPage from "./pages/EditorPage";
import LoginDialog from "./components/loginDialog";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/login" element={<LoginDialog />} />
        <Route path="/app" element={user ? <AppPage /> : <Home />}>
          <Route path=":id" element={<EditorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
