import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {Home} from "./Pages/Home.jsx";
import {AuthContext} from "./Components/AuthContext.jsx";
import {Header} from "./Components/Header.jsx";
import {Footer} from "./Components/Footer.jsx";
import {SuggestCard} from "./Pages/SuggestCard.jsx";
import Callback from "./Components/Callback.jsx";
import {Unauthorised} from "./Pages/Unauthorised.jsx";

function App() {
    const [user, setUser] = React.useState(null);

    function setUserInfo(userInfo) {
        console.log('User Info:', userInfo);
        setUser(userInfo);
    }

    function logout() {
        setUser(null);
    }

console.log(user)
    return (
        <>
            <Header user={user} logout={logout} />
            <main>
                <AuthContext.Provider value={{user}}>
                    <Router>
                        <Routes>
                            <Route exact path="/" element={<Home user={user} />} />
                            <Route path="/suggestCard" element={user !== null ? <SuggestCard/> : <Navigate to="/"/>}/>
                            <Route path="/callback" element={<Callback setUserInfo={setUserInfo} />} />
                            <Route path="/unauthorized" element={<Unauthorised/>}/>
                        </Routes>
                    </Router>
                </AuthContext.Provider>
            </main>
            <Footer/>
        </>
    );
}

export default App;