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
import axios from "axios";


function App() {
    const [user, setUser] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [votes, setVotes] = React.useState([]);
    const DEFAULT_CARD_STATUS = 'pending vote';
    const ALL_USERS = import.meta.env.VITE_AUTH_UUID.split(',') + import.meta.env.VITE_ADMIN_UUID.split(',');

    useEffect(() => {
        // call the backend to get the users, banned cards, pending cards, and votes
        fetch('http://localhost:5174/getCards')
            .then(response => response.json())
            .then(data => {
                setCards(data);
                console.log("cards: ", data)
            });
        fetch('http://localhost:5174/getVotes')
            .then(response => response.json())
            .then(data => {
                setVotes(data);
                console.log("votes: ", data)
            });


    }, []);

    const onVote = async (card_id, user_id, vote) => {
        return card_id, user_id, vote //just to make the ide happy
        //TODO: Implement the vote logic
        // update the vote in the state
        // update the vote in the database
    }

    function setUserInfo(userInfo) {
        console.log('User Info:', userInfo);
        setUser(userInfo);
    }

    function handleBanCardSubmit(cardName, banReason, cardUrl) {
        // if card is already in the list, do not add it again and alert the user
        if (cards.some(card => card.card_name === cardName)) {
            alert('Card is already in the list');
            return;
        }
        // call the backend to ban the card and add it to the card list
        addCardToDatabase(cardName, cardUrl, banReason, user.uuid,)
        // update the cards list
        setCards([...cards, {
            card_name: cardName,
            card_image_url: cardUrl,
            reason_for_ban: banReason,
            recommended_by: user.uuid,
            status: DEFAULT_CARD_STATUS
        }])
    }

    function addCardToDatabase(cardName, cardUrl, banReason, recommendedUser) {
        console.log('Adding card to database')
        axios.post('http://localhost:5174/addCard', {
            card_name: cardName,
            card_image_url: cardUrl,
            reason_for_ban: banReason,
            recommended_by: recommendedUser,
            status: DEFAULT_CARD_STATUS
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }



    function logout() {
        setUser(null);
    }

    return (
        <>
            <AuthContext.Provider value={{user}}>
                <Router>
                    <Header user={user} logout={logout} />
                    <main>
                        <Routes>
                            <Route exact path="/" element={<Home user={user} cards={cards}  votes={votes} onVote={onVote}/>} />
                            <Route path="/suggestCard" element={user !== null ? <SuggestCard onBanCardSubmit={handleBanCardSubmit}/> : <Navigate to="/unauthorized"/>}/>
                            <Route path="/admin" element={user !== null && user.isAdmin ? <AdminDashboard/> : <Navigate to="/unauthorized"/>}/>
                            <Route path="/callback" element={<Callback setUserInfo={setUserInfo} allUsers={ALL_USERS} />} />
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