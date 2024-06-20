//TODO: Setup Database for Banned cards, Users, pending Decision cards
//TODO: create voting system
//TODO: create admin page
//TODO: add Auth users to .env file
//TODO: add Admin users to .env file
//TODO: write tests
//TODO: add error handling
//TODO: write css
//TODO: split up components more


import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {AuthContext} from "./Components/AuthContext.jsx";
import {Home} from "./Pages/Home.jsx";
import {Header} from "./Components/Header.jsx";
import {Footer} from "./Components/Footer.jsx";
import {SuggestCard} from "./Pages/SuggestCard.jsx";
import Callback from "./Components/Callback.jsx";
import {AdminDashboard} from "./Pages/AdminDashboard.jsx";
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
                            <Route path="/admin" element={user !== null && user.isAdmin ? <AdminDashboard/> : <Navigate to="/"/>}/>
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