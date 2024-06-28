import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";




export function Home({ cards, user }) {
    const [bannedCardData, setBannedCardData] = useState([]);
    const [pendingCardData, setPendingCardData] = useState([]);

    const BannedCards = cards.filter(card => card.status === 'banned');
    const PendingCards = cards.filter(card => card.status === 'pending vote');


    return (
        <>
            <h2>Banned Cards</h2>
            {user !== null && (
                <Link to="/suggestCard">
                    <button className="btn" >Request Card To Be Banned</button>
                </Link>
            )}
            <div className="cardContainer">
                {bannedCardData.map((card, index) => (
                    <div key={index} className="card">
                        <h2>{card.name}</h2>
                        <img src={card.image_uris?.normal} alt={card.name}/>
                        <p>{BannedCards[index].reason}</p>
                    </div>
                ))}
            </div>
            <div className="divider"></div>
            <h2>Cards Pending Decision</h2>
            <div className="cardContainer">
                {PendingCards.map((card, index) => (
                    <div key={index} className="card">
                        <h2>{card.card_name}</h2>
                        <img src={card.card_image_url} alt={card.card_name}/>
                        <button className="btn">Details</button>
                    </div>
                ))}
            </div>
        </>
    )
}