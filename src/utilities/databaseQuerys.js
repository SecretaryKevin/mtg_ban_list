// holds queries for the database
export const databaseQuerys = {
        getCards: `SELECT * FROM cards`,
        getUsers: `SELECT * FROM users`,
        getVotes: `SELECT * FROM votes`,
        updateVoteOption: `UPDATE votes SET voteOption = ? WHERE cardId = ? AND userId = ?`,
        getAllBannedCards: `SELECT * FROM Cards WHERE status='banned'`,
        getPendingCards: `SELECT * FROM Cards WHERE status='pending vote'`,};
