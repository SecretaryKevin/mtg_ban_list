import { useNavigate } from "react-router-dom";

export function Unauthorised() {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate("/");
    }

    return (
        <>
            <h1>Unauthorised</h1>
            <p>This is a private Magic the Gathering banned cards tracker, reserved for a select few people.</p>
            <p>If you believe you should have access to this program, please contact "secretary_kevin" on Discord.</p>
            <button onClick={navigateToHome}>Home</button>
        </>
    )
}