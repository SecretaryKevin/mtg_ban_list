import propTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CardSearch } from '../Components/CardSearch';


export function SuggestCard( { onBanCardSubmit }) {
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState(null);
    const [banReason, setBanReason] = useState('');

    const handleBanReasonChange = (event) => {
        setBanReason(event.target.value);
    };

    const banCardSubmit = async (event) => {
        event.preventDefault();
        if (onBanCardSubmit) {
            onBanCardSubmit(selectedCard.name, banReason, selectedCard.image_uris?.normal);
        }
        navigate('/');
    };


    return (
        <>
            <h1>Suggest a Card</h1>
            {selectedCard === null ? (
                <CardSearch onCardSelect={setSelectedCard} />
            ) : selectedCard === "No cards found." ? (
                <p>No cards found.</p>
            ) : (
                <>
                    <div className="card">
                        <img src={selectedCard.image_uris?.normal} alt={selectedCard.name}/>
                    </div>
                    <form onSubmit={banCardSubmit}>
                        <label>
                            Ban Reason:
                            <input
                                placeholder="Enter Ban Reason"
                                type="text"
                                value={banReason}
                                onChange={handleBanReasonChange}
                                maxLength={2000}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                    <button onClick={() => setSelectedCard(null)}>Back</button>
                </>
            )}
        </>
    );
}

SuggestCard.propTypes = {
    onBanCardSubmit: propTypes.func
};
