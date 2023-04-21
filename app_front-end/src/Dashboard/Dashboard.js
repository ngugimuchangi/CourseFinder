import "./Dashboard.css";
import { useState } from "react";


function Dashboard() {

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleLogout = () => {
        setIsLoggedIn(false);
        window.location.href = "/";
    };
        return (
            <div className="Dashboard" id="dashboard">
                    <div class="area">
                        <nav class="main-menu">
                            <ul>

                                <li class="has-subnav">
                                    <a href="#">
                                    <i class="fa fa-book fa-4x"></i>
                                        <span class="nav-text">
                                            Courses
                                        </span>
                                    </a>
                                </li>
                                <li class="has-subnav">
                                    <a href="#">
                                        <i class="fa fa-bookmark fa-2x"></i>
                                        <span class="nav-text">
                                            Bookmarks
                                        </span>
                                    </a>
                                    
                                </li>
                                <li>
                                <a href="#">
                                    <i class="fa fa-cogs fa-2x"></i>
                                        <span class="nav-text">
                                            Settings
                                        </span>
                                    </a>
                                </li>
                            </ul>

                            <ul class="logout">
                                <li>
                                <a href="" onClick={handleLogout}>
                                        <i class="fa fa-power-off fa-2x"></i>
                                        <span class="nav-text">
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
