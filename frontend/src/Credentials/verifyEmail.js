import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';
import './Container.css';

function EmailVerification() {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { Id, verificationToken } = useParams();

    useEffect(() => {
        async function verifyEmail() {
            try {
                const api = axios.create({
                    baseURL: 'http://127.0.0.1:1245',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Token': Cookies.get('user')
                    }
                });
                let url = `/auth/verify-email`;
                api.put(`${url}/${Id}/${verificationToken}`)
                    .then(response => {
                        console.log(response);
                        setIsConfirmed(true);
                        window.location.href = "/login";
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
    }, [Id, setIsConfirmed, verificationToken]);

    return (
            <div id="auth/verify-email/" className="content_area">
                {isConfirmed ? <p className='Confirmed_email'>Email Confirmed</p>
                    :<p>Verifying Email...</p>
                }
            </div>
    );
}

export default EmailVerification;
