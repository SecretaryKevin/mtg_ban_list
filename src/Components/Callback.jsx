import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AUTH_USERS = import.meta.env.VITE_AUTH_UUID.split(',');
const ADMIN_USERS = import.meta.env.VITE_ADMIN_UUID.split(',');
import loadingGif from '../statics/loading.gif';
const Callback = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        console.log('Authorization Code:', code);

        if (code) {
            const data = {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'http://localhost:5173/callback', // Replace with your registered redirect_uri
            };

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            console.log('client id', import.meta.env.VITE_CLIENT_ID)
            console.log('secret', import.meta.env.VITE_CLIENT_SECRET)
            axios.post('https://discord.com/api/oauth2/token', new URLSearchParams(data).toString(), {
                headers: headers,
                auth: {
                    username: import.meta.env.VITE_CLIENT_ID,
                    password: import.meta.env.VITE_CLIENT_SECRET,
                },
            }).then(response => {
                console.log('Token Exchange Response:', response.data);
                const accessToken = response.data.access_token;
                const refreshToken = response.data.refresh_token;
                const expiresIn = response.data.expires_in;

                console.log("Refresh Token: ", refreshToken);
                console.log("Expires In: ", expiresIn);

                // Use the access token to get the user's UUID, name, and profile picture
                axios.get('https://discord.com/api/users/@me', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }).then(response => {
                    console.log('user uuid', response.data.id);
                    console.log('auth users', AUTH_USERS);
                    if (AUTH_USERS.includes(response.data.id) || ADMIN_USERS.includes(response.data.id)) {
                        const userInfo = {
                            uuid: response.data.id,
                            name: response.data.username,
                            profilePicture: `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.png`,
                            refreshToken: refreshToken,
                            expiresIn: expiresIn,
                            isAdmin: ADMIN_USERS.includes(response.data.id)
                        };
                        props.setUserInfo(userInfo);
                    }
                    else{
                        // redirect to unauthorized page
                        navigate('/unauthorized');
                    }
                }).catch(error => {
                    console.error('Error during user info retrieval:', error.response || error.message);
                });

                navigate('/'); // Navigate to home or desired route after successful token exchange
            }).catch(error => {
                console.error('Error during token exchange:', error.response || error.message);
            });
        }
    }, [navigate, props]);

    return (
        <div>
            <h2>Loading...</h2>
            <img src={loadingGif} alt="loading"/>
        </div>
    );
};

export default Callback;