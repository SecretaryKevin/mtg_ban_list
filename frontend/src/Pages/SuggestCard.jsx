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

    const fetchCards = async (query, page = 1) => {
        try {
            const response = await axios.get(`https://api.scryfall.com/cards/search`, {
                params: {
                    q: `name:"${query}"`,
                    order: 'name',
                    page: page
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching cards:', error);
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setCards([]);
        setSelectedCard(null);

        const results = [];
        let page = 1;
        let moreResults = true;

        while (moreResults) {
            const data = await fetchCards(cardName, page);
            if (data && data.data && data.data.length > 0) {
                results.push(...data.data);
                if (data.has_more) {
                    page += 1;
                } else {
                    moreResults = false;
                }
            } else {
                moreResults = false;
            }
        }

        if (results.length > 0) {
            setCards(results);
        } else {
            setSelectedCard("No cards found.");
        }
    };

    return (
        <>
            <h1>Suggest a Card</h1>
            {selectedCard === null && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Card Name:
                        <input placeholder="Search Via Card Name" type="text" value={cardName} onChange={handleInputChange}/>
                    </label>
                    <button type="submit">Search</button>
                </form>
            )}
            {selectedCard === null ? (
                    <div className="cardContainer">
                        {cards.map((card, index) => (
                            card.image_uris?.normal != undefined ? (
                                <div className="card" key={index} onClick={() => onCardClick(card)}>
                                <img src={card.image_uris?.normal} alt={card.name}/>
                            </div>
                        ) : null
                    ))}
                </div>
                ) :
    selectedCard === "No cards found." ? (
        <p>No cards found.</p>
    ) : (
        <>
            <div className="card" onClick={() => onCardClick(selectedCard)}>
                <img src={selectedCard.image_uris?.normal} alt={selectedCard.name} />
            </div>
            <form>
                <label>
                    Ban Reason:
                    <input placeholder="Enter Ban Reason" type="text" value={banReason} onChange={handleBanReasonChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => setSelectedCard(null)}>Back</button>
        </>
            )}
        </>
    );
}
