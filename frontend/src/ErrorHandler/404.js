import { useState, useEffect } from 'react';
import axios from 'axios';
import "./404.css";
import Home from "../LandingPage/Home";

function NotFound() {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            axios.get('/api/check-route')
                .then(response => {
                    if (response.data.routeExists) {
                        setRedirect(true);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }, 30000); // 30 seconds

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    if (redirect) {
        return <Home />;
    }

    return (
        <div className="Error-container">
            <h1>404 Not Found</h1>
            <p>The page you're looking for does not exist.</p>
            <p>Checking the route on the server...</p>
        </div>
    );
}

export default NotFound;
