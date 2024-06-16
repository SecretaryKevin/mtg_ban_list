import React, { useState } from 'react';
import axios from 'axios';

export function SuggestCard() {
    const [cardName, setCardName] = useState('');
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [banReason, setBanReason] = useState('');

    const handleInputChange = (event) => {
        setCardName(event.target.value);
    };

    const handleBanReasonChange = (event) => {
        setBanReason(event.target.value);
    };

    const onCardClick = (card) => {
        setSelectedCard(card);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`https://api.scryfall.com/cards/search?order=name&q=${cardName}`);
            setCards(response.data.data);
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    return (
        <>
            <h1>Suggest a Card</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Card Name:
                    <input placeholder="Search Via Card Name" type="text" name="cardName" onChange={handleInputChange} />
                    <button type="submit">Search</button>
                </label>
            </form>
            {selectedCard === null ? (
                <div className={"cardContainer"}>
                    {cards.map((card, index) => (
                        <div className={"card"} key={index} onClick={() => onCardClick(card)}>
                            <img src={card.image_uris?.normal} alt={card.name}/>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className={"card"} onClick={() => onCardClick(selectedCard)}>
                        <img src={selectedCard.image_uris?.normal} alt={selectedCard.name}/>
                    </div>
                    <form>
                        <label>
                            Ban Reason:
                            <input placeholder="Enter Ban Reason" type="text" name="banReason" onChange={handleBanReasonChange} />
                        </label>
                    </form>
                </>
            )}
        </>
    );
}