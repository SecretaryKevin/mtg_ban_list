import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loadingGif from '../statics/loading.gif';

const AUTH_USERS = import.meta.env.VITE_AUTH_UUID.split(',');
const ADMIN_USERS = import.meta.env.VITE_ADMIN_UUID.split(',');
const REDIRECT_URI = 'http://localhost:5173/callback';
const DISCORD_API_URL = 'https://discord.com/api';

const fetchToken = async (code) => {
    const data = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    return axios.post(`${DISCORD_API_URL}/oauth2/token`, new URLSearchParams(data).toString(), {
        headers: headers,
        auth: {
            username: import.meta.env.VITE_CLIENT_ID,
            password: import.meta.env.VITE_CLIENT_SECRET,
        },
    });
};

const fetchUserInfo = async (accessToken) => {
    return axios.get(`${DISCORD_API_URL}/users/@me`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
};

const Callback = ({ setUserInfo, allUsers }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            fetchToken(code)
                .then(({ data }) => {
                    const { access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn } = data;

                    fetchUserInfo(accessToken)
                        .then(({ data }) => {
                            const {id, username} = data;


                            // check if the user is authorized
                            if (AUTH_USERS.includes(id) || ADMIN_USERS.includes(id)) {
                                //check if the user is in the database
                                let userExists = false;
                                for (const user of allUsers) {
                                    if (user.uuid === id) {
                                        userExists = true;
                                    }
                                }
                                if (!userExists) {
                                    // if user is not in the database, add them
                                    axios.post('http://localhost:5174/addUser', {
                                        uuid: id,
                                        name: username
                                    })
                                }
                                const userInfo = {
                                    uuid: id,
                                    name: username,
                                    isAdmin: ADMIN_USERS.includes(id)
                                };
                                setUserInfo(userInfo);
                            } else {
                                navigate('/unauthorized');
                            }
                        })
                        .catch(error => {
                            console.error('Error during user info retrieval:', error.response || error.message);
                        });

                    navigate('/');
                })
                .catch(error => {
                    console.error('Error during token exchange:', error.response || error.message);
                });
        }
    }, [navigate, setUserInfo]);

    return (
        <div>
            <h2>Loading...</h2>
            <img src={loadingGif} alt="loading"/>
        </div>
    );
};

export default Callback;