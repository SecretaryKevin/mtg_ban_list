import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./Components/Home.jsx";
import { About } from "./Components/About.jsx";
import { AuthContext } from "./Components/AuthContext.jsx";
import React from "react";
import {Header} from "./Components/Header.jsx";
import {Footer} from "./Components/Footer.jsx";

function App() {
    const [isAuth, setIsAuth] = React.useState(false);

    const login = () => {
        setIsAuth(true);
    };

    return (
        <>
            <Header />
            <main>
                <AuthContext.Provider value={{ isAuth, login }}>
                    <Router>
                        <Routes>

                            <Route exact path="/" element={<Home />} />
                            <Route path="/about" element={isAuth ? <About /> : <Navigate to="/" />} />
                        </Routes>
                    </Router>
                </AuthContext.Provider>
            </main>
            <Footer />
        </>
    );
}

export default App;