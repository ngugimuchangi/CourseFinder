import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';
import './Container.css';

function EmailVerification() {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { Id, verificationToken } = useParams();
    const apis = process.env.REACT_APP_BACKEND_API;

    useEffect(() => {
        async function verifyEmail() {
            try {
                const api = axios.create({
                    baseURL: apis,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Token': Cookies.get('user')
                    }
                });
                let url = `/auth/verify-email/`;
                api.put(`${url}/${Id}/${verificationToken}`)
                    .then(response => {
                        console.log(response);
                        setIsConfirmed(true);
                        setTimeout(() => {
                            window.location.href = "/login";
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
        verifyEmail();
    }, [Id, apis, setIsConfirmed, verificationToken]);

    return (
            <div id="auth/verify-email/" className="content_area">
                {isConfirmed ? <p className='Confirmed_email'>Email Confirmed</p>
                    :<p>Verifying Email...</p>
                }
            </div>
    );
}

export default EmailVerification;
