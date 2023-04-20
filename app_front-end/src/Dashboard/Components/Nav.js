import "./Nav.css";
import SearchBar from './Form'


export default function NavBar() {
        return (
                <header className="Navbar">
                        <img src="" alt="logo" />
                        <SearchBar />
                        <div className="Icons">
                                <div className="Icons-Spans">
                                        <span>Messages</span>
                                </div>
                                <div className="Icons-Spans">
                                        <span>Notification</span>
                                </div>
                                <div className="Icons-Spans">
                                        <span>UserPhoto</span>
                                </div>
                                <div className="Icons-Spans">
                                        <span>DropDown</span>
                                        <ul>
                                                <li>View profile</li>
                                                <li>Help</li>
                                                <li>Log out</li>
                                        </ul>
                                </div>
                        </div>
                </header>
        );
}