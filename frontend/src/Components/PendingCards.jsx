function hasVoted(votes, card_name, user) {
    // Check if the user has voted on the card
    for (let vote of votes) {
        if (vote.card_id === card_name && vote.user_id === user.id) {
            return true;
        }
    }
    return false;
}

export function PendingCards(cards, votes, user, onVote) {
    return (
        <div className={"pendingCardsContainer"}>
            <h2>Cards pending decision</h2>
            {cards.length === 0 ? (
                <p>No cards are pending a decision</p>
            ):(
                <div className="cardContainer">
                    {cards.map((card, index) => {
                        return (
                            <div key={index} className="card">
                                <h2>{card.card_name}</h2>
                                <img src={card.card_image_url} alt={card.card_name}/>
                                <p>{card.reason_for_ban}</p>
                                <p>{card.recommended_by}</p>
                                {hasVoted(votes, card.card_name, user) === false && (
                                    <div className="voteButtons">
                                        <button className={"approveButton"} onClick={() => onVote(card.id, user.id, true)}>Approve</button>
                                        <button className={"rejectButton"} onClick={() => onVote(card.id, user.id, false)}>Reject</button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}