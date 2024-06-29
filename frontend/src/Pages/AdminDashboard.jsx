export function AdminDashboard() {
    return (
        <>
            <h1>Admin Dashboard</h1>
            <div className="divider"></div>
            <div className={"adminStatsContainer"}>
                <h2>Admin Stats:</h2>
                <p>Number of Banned Cards: 0</p>
                <p>Number of Pending Votes: 0</p>
                <p>Number of Auth Users: 0</p>
                <p>Number of Admin Users: 0</p>
            </div>
            <div className="divider"></div>
            <div className={"adminActionsContainer"}>
                <h2>Admin Actions: </h2>
                <ul>
                    <li>
                        <button>Delete banned card</button>
                    </li>
                    <li>
                        <button>Force Card Ban</button>
                    </li>
                    <li>
                        <button>Add new auth user</button>
                    </li>
                    <li>
                        <button>Remove auth user</button>
                    </li>
                    <li>
                        <button>Set new admin user</button>
                    </li>
                    <li>
                        <button>Edit Vote System Settings</button>
                    </li>
                </ul>
            </div>
        </>
    );
}