export function Header({ user, logout }) {
    return (
        <>
            <header>
                <h1>MTG Ban Card List</h1>
                <nav>
                    <ul>
                        {user === null ? <li>
                            <a href={"https://discord.com/oauth2/authorize?client_id=1251121188051357787&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fcallback&scope=identify"}>
                                <button>Login</button>
                            </a>
                        </li> : <li><button onClick={logout}>Logout</button></li>}
                    </ul>
                </nav>
            </header>
        </>
    )
}