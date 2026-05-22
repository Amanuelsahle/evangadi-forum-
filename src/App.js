import React, { useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import instance from "./axiosConfig/axiosConfig";
import AskQuestion from "./pages/askQuestion/AskQuestion";
import QuestionDetail from "./pages/questionDetail/QuestionDetail";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PuffLoader from "react-spinners/PuffLoader";
import HowItWorks from "./pages/howItWorks/HowItWorks";

export const AppState = createContext();

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function checkUser() {
    try {
      const { data } = await instance.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.username);
    } catch (error) {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      checkUser();
    } else {
      navigate("/login");
      setLoading(false);
    }
  }, []);
  {
    if (loading)
      return (
        <div style={{ padding: "100px", justifyItems: "center" }}>
          <PuffLoader color="#55e8e7" size={80} speedMultiplier={2} />
        </div>
      );
  }
  return (
    <AppState.Provider value={{ user, setUser }}>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/askquestion" element={<AskQuestion />} />
        <Route path="/question/:id" element={<QuestionDetail />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}
export default App;
