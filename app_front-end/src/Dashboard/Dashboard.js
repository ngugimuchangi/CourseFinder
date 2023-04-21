import "./Dashboard.css";
import { useState, useEffect } from "react";


function Dashboard() {

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/";
    };
    
    // Add useEffect hook to check for isLoggedIn value on mount
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "false") {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <div className="Dashboard" id="dashboard">
            <div className="area">
                <nav className="main-menu">
                    <ul>

                        <li className="has-subnav">
                            <a href="#">
                                <i className="fa fa-book fa-4x"></i>
                                <span className="nav-text">
                                    Courses
                                </span>
                            </a>
                        </li>
                        <li className="has-subnav">
                            <a href="#">
                                <i className="fa fa-bookmark fa-2x"></i>
                                <span className="nav-text">
                                    Bookmarks
                                </span>
                            </a>
                            
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-cogs fa-2x"></i>
                                <span className="nav-text">
                                    Settings
                                </span>
                            </a>
                        </li>
                    </ul>

                    <ul className="logout">
                        <li>
                            <a href="/" onClick={handleLogout}>
                                <i className="fa fa-power-off fa-2x"></i>
                                <span className="nav-text">
                                    Logout
                                </span>
                            </a>
                        </li>  
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Dashboard;
