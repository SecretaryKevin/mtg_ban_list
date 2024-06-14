import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./Home.jsx";
import { About } from "./About.jsx";
import { AuthContext } from "./AuthContext.jsx";
import React from "react";
import {Header} from "./Components/Header.jsx";

function App() {
    const [isAuth, setIsAuth] = React.useState(false);

    const login = () => {
        setIsAuth(true);
    };

    return (
        <>
        <Header />
        <AuthContext.Provider value={{ isAuth, login }}>
            <Router>
                <Routes>

                    <Route exact path="/" element={<Home />} />
                    <Route path="/about" element={isAuth ? <About /> : <Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
        </>
    );
}

export default App;