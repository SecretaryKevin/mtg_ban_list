export function BannedCards(cards) {
    return (
        <div className={"bannedCardsContainer"}>
            <h2>Banned Cards</h2>
            {cards.length === 0 ? (
                <p>No cards have been banned yet</p>
            ):(
                <div className="cardContainer">
                    {cards.map((card, index) => (
                        <div key={index} className="card">
                        <h2>{card.card_name}</h2>
                        <img src={card.card_image_url} alt={card.card_name}/>
                        <button className="btn">Details</button>s
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}