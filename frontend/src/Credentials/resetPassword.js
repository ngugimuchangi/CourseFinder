import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';
import './Container.css';

function ResetPassword() {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { Id, verificationToken } = useParams();
    const apis = process.env.REACT_APP_BACKEND_API;

    useEffect(() => {
        async function verifyPassword() {
            try {
                const api = axios.create({
                    baseURL: apis,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Token': Cookies.get('user'),
                    }
                });
                let url = `/auth/verify-password`;
                api.put(`${url}/${Id}/${verificationToken}`)
                    .then(response => {
                        setIsConfirmed(true);
                        Cookies.set('user');
                        setTimeout(() => {
                                window.location.href = "/settings";
                                console.log()
                            }, 30000);
                    })
                    .catch(error => {
                        console.log(error);
                        window.location.href = "/";
                    });
            } catch (error) {
                console.error(error);

            }
        }
        verifyPassword();
    }, [Id, apis, setIsConfirmed, verificationToken]);

    return (
            <div id="auth/verify-password/" className="content_area">
                {isConfirmed ? <p className='Confirmed_email'>Email Confirmed</p>
                    :<p>Verifying Email...</p>
                }
            </div>
    );
}

export default ResetPassword;
