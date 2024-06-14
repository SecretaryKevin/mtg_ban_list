import { Link } from "react-router-dom";

export function Home(BannedCards = {}, PendingCards = {}, isLoggedIn = false) {
    return (
        <>
            <h2>Banned Cards</h2>
            {isLoggedIn && (
                <Link to="/suggestCard">
                    <button className="btn" >Request Card To Be Banned</button>
                </Link>
            )}
            <div className="cardContainer">
                {BannedCards.length > 0 ? BannedCards.map((card, index) => {
                    return (
                        <div key={index} className="card">
                            <h2>{card.name}</h2>
                            <p>{card.reason}</p>
                        </div>
                    )
                }) : <h3>No cards are currently banned</h3>}
            </div>
            <div className="divider"></div>
            <h2>Cards Pending Decision</h2>
            {PendingCards.length > 0 ? PendingCards.map((card, index) => {
                return (
                    <div key={index} className="card">
                        <h2>{card.name}</h2>
                        <p>{card.reason}</p>
                    </div>
                )
            }) : <h3>No cards are currently pending a decision</h3>}
        </>
    )
}