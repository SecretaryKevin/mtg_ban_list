import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


export function Home({ cards, user, votes, onVote }) {
    const BannedCards = cards.filter(card => card.status === 'banned');
    const PendingCards = cards.filter(card => card.status === 'pending vote');

    return (
        <>
            {user !== null && (
                <Link to="/suggestCard">
                    <button className="btn" >Request Card To Be Banned</button>
                </Link>
            )}
            <BannedCards cards={BannedCards} />
            <div className="divider"></div>
            <PendingCards cards={PendingCards} votes={votes} user={user} onVote={onVote} />
        </>
    )
}

Home.propTypes = {
    cards:
        PropTypes.arrayOf(PropTypes.shape({
            status: PropTypes.string.isRequired,
            card_name: PropTypes.string.isRequired,
            card_image_url: PropTypes.string.isRequired,
            reason_for_ban: PropTypes.string,
            recommended_by: PropTypes.string,
        })).isRequired,
    user:
        PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
        }),
    ).isRequired,
    votes:
        PropTypes.arrayOf(PropTypes.shape({
            card_id: PropTypes.string.isRequired,
            user_id: PropTypes.number.isRequired,
        })),
    onVote:
        PropTypes.func.isRequired
};
