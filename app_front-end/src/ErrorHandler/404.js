import "./404.css";

function NotFound() {
        return (
                <div className="Error-container">
                        <h1>404  Not Found</h1>
                        <p>The page you're looking for does not exist.</p>
                        <p>Click here to be redirect back to <a href="/">Home</a></p>
                </div>
        );
}

export default NotFound;