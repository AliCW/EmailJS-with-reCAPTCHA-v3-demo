import React, { useState, useEffect }from "react";
import Check from "./Check.jsx";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import axios from "axios";


export default function Main() {
    const [key, setKey] = useState();
    const [loadForm, setLoadForm] = useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:9090/api/reCAPTCHA/public_key")
            .then(( { data }) => {
                setKey(data.key[0].key)
                setLoadForm(true);
            })
    }, [key])

    return (
        <div>
            <h1 className="header">Email JS Demo</h1>
            {loadForm && 
            <div>
            <GoogleReCaptchaProvider reCaptchaKey={key}>
                <Check />
            </GoogleReCaptchaProvider>
            </div>}
        </div>
    );
};