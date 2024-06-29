import  { useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

export function CardSearch({ onCardSelect }) {
    const [cardName, setCardName] = useState('');
    const [cards, setCards] = useState([]);

    const handleInputChange = (event) => {
        setCardName(event.target.value);
    };

    const onCardClick = (card) => {
        onCardSelect(card);
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
            onCardSelect("No cards found.");
        }
    };

    return (
        <>
            {cards.length === 0 && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Card Name:
                        <input placeholder="Search Via Card Name" type="text" value={cardName} onChange={handleInputChange}/>
                    </label>
                    <button type="submit">Search</button>
                </form>
            )}
            {cards.length > 0 && (
                <div className="cardContainer">
                    {cards.map((card, index) => (
                        card.image_uris?.normal != undefined ? (
                            <div className="card" key={index} onClick={() => onCardClick(card)}>
                                <img src={card.image_uris?.normal} alt={card.name}/>
                            </div>
                        ) : null
                    ))}
                </div>
            )}
        </>
    );
}

CardSearch.propTypes = {
    onCardSelect: PropTypes.func.isRequired
};