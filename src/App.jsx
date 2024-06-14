import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {Home} from "./Components/Home.jsx";
import {AuthContext} from "./Components/AuthContext.jsx";
import {Header} from "./Components/Header.jsx";
import {Footer} from "./Components/Footer.jsx";
import {SuggestCard} from "./Components/SuggestCard.jsx";

function App() {
    const [isAuth, setIsAuth] = React.useState(false);

    const login = () => {
        setIsAuth(true);
    };
    console.log(isAuth)
    return (
        <>
            <Header isLoggedIn={isAuth}/>
            <main>
                <AuthContext.Provider value={{isAuth, login}}>
                    <Router>
                        <Routes>
                            <Route exact path="/" element={<AuthContext.Consumer>{({isAuth}) => <Home isLoggedIn={isAuth}/>}</AuthContext.Consumer>}/>
                            <Route path="/suggestCard" element={isAuth ? <SuggestCard/> : <Navigate to="/"/>}/>
                        </Routes>
                    </Router>
                </AuthContext.Provider>
            </main>
            <Footer/>
        </>
    );
}

export default App;