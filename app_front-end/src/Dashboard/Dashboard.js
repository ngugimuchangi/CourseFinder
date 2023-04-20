import { useState, useEffect } from 'react';
import "./Dashboard.css";
import NavBar from './Components/Nav';
import Login from "../Credentials/Login";

export default function Dashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true); // set isAuthenticated to true if a token exists in localStorage
        } else {
            setIsAuthenticated(false); // set isAuthenticated to false if no token exists in localStorage
        }
    }, []);

    // If user is not authenticated, render Login component
    if (!isAuthenticated) {
        return (
                <Login />
        );
    }

    // If user is authenticated, render dashboard
    return (
        <div className="Dashboard" id="dashboard">
            <NavBar />
        </div>
    );
}