import React, {useEffect} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {AuthContext} from "./Components/AuthContext.jsx";
import {Home} from "./Pages/Home.jsx";
import {Header} from "./Components/Header.jsx";
import {Footer} from "./Components/Footer.jsx";
import Callback from "./Components/Callback.jsx";
import {SuggestCard} from "./Pages/SuggestCard.jsx";
import {AdminDashboard} from "./Pages/AdminDashboard.jsx";
import {Unauthorised} from "./Pages/Unauthorised.jsx";


function App() {
    const [user, setUser] = React.useState(null);
    const [BannedCards, setBannedCards] = React.useState([]);
    const [PendingCards, setPendingCards] = React.useState([]);
    const [allUsers, setAllUsers] = React.useState([]);


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
            <AuthContext.Provider value={{user}}>
                <Router>
                    <Header user={user} logout={logout} />
                    <main>
                        <Routes>
                            <Route exact path="/" element={<Home user={user} />} />
                            <Route path="/suggestCard" element={user !== null ? <SuggestCard/> : <Navigate to="/unauthorized"/>}/>
                            <Route path="/admin" element={user !== null && user.isAdmin ? <AdminDashboard/> : <Navigate to="/unauthorized"/>}/>
                            <Route path="/callback" element={<Callback setUserInfo={setUserInfo} />} />
                            <Route path="/unauthorized" element={<Unauthorised/>}/>
                        </Routes>
                    </main>
                    <Footer/>
                </Router>
            </AuthContext.Provider>
        </>
    );
}

export default App;