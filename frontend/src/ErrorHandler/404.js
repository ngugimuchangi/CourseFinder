import { useState, useEffect } from 'react';
import axios from 'axios';
import './404.css';
import Button from 'react-bootstrap/esm/Button';

const CHECK_ROUTE_TIMEOUT = 5000;

function NotFound() {
  const [isLoading, setIsLoading] = useState(true);
  const urls = process.env.REACT_APP_BACKEND_API;

  useEffect(() => {
    const api = axios.create({
      baseURL: urls,
      headers: {
        'Content-Type': 'application/json',
        'X-Token': localStorage.getItem('user'),
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
  }, [urls]);

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
      <p>The page/resource you're looking for does not exist.</p>
      <Button onClick={() => window.location.href = "/"}>Go to home page</Button>
    </div>
  );
}

export default NotFound;
