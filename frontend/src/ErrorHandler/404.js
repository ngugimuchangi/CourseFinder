import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './404.css';

const CHECK_ROUTE_TIMEOUT = 30000;

function NotFound() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://127.0.0.1:1245',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': Cookies.get('session'),
      },
    });

    const timeoutId = setTimeout(() => {
      api.get(`/`)
        .then(response => {
          if (response.data.routeExists) {
            window.location.href = "/"
          } else {
            setIsLoading(false);
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.log(error);
        });
    }, CHECK_ROUTE_TIMEOUT);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="Loading-container">
        <p>Checking the route on the server...</p>
      </div>
    );
  }

  return (
    <div className="Error-container">
      <h1>404 Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <button onClick={() => window.location.href = "/"}>Go to home page</button>
    </div>
  );
}

export default NotFound;
