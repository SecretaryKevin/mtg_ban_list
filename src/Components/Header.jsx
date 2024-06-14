export function Header(isLoggedIn = false) {
    return (
        <>
            <header>
                <h1>Magic Ban List</h1>
                <nav>
                    <ul>
                        {isLoggedIn ? <li><button>Login</button></li> : <li><button>Logout</button></li>}
                    </ul>
                </nav>
            </header>
        </>
    )
}