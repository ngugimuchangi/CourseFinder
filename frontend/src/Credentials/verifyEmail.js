import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';

function EmailVerification() {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { Id, verificationToken } = useParams();

    useEffect(() => {
        async function verifyEmail() {
            try {
                const api = axios.create({
                    baseURL: 'http://127.0.0.1:1245',
                    /*headers: {
                        'Content-Type': 'application/json',
                        'X-Token': Cookies.get('session')
                    }*/
                });
                let url = `/auth/verify-email`;
                api.put(`${url}/${Id}/${verificationToken}`)
                    .then(response => {
                        console.log(response);
                        setIsConfirmed(true);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } catch (error) {
                console.error(error);

            }
        }
        verifyEmail();
    }, [Id, setIsConfirmed, verificationToken]);

    return (
        <div id="auth/verify-email/">
            {isConfirmed ? <p>Email Confirmed</p> : <p>Verifying Email...</p>}
        </div>
    );
}

export default EmailVerification;
