import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
export function Header({ user, logout }) {
    return (
        <>
            <header>
                <h1>MTG Ban Card List</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                <button>Home</button>
                            </Link>
                        </li>
                        {user !== null && user.isAdmin && <li>
                            <Link to="/admin">
                                <button>Admin Dashboard</button>
                            </Link>
                        </li>}
                        {user === null ? <li>
                            <a href={"https://discord.com/oauth2/authorize?client_id=1251121188051357787&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fcallback&scope=identify"}>
                                <button>Login</button>
                            </a>
                        </li> : <li><button onClick={logout}>Logout</button></li>}
                    </ul>
                </nav>
            </header>
            <div className="divider"></div>
        </>
    )
}
Header.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
    }),
    logout: PropTypes.func.isRequired
};