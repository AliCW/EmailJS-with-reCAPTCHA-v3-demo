import React, { useState, useCallback, useEffect } from "react";
import Contact from "./Contact.jsx";
import axios from "axios";

export default function Captcha({ props }) {
    const [reCAPTCHAError, setReCAPTCHAError] = useState(false);
    
        const handleReCaptchaToken = useCallback(() => {
    
            return axios.post("http://127.0.0.1:9090/api/reCAPTCHA/check/", {"props": props})
                .then(({ data }) => {
                    if (data.data.success === false){
                        setReCAPTCHAError(true)
                    }
                });
        });
    
        useEffect(() => {
            handleReCaptchaToken();
        }, [handleReCaptchaToken])

        return (
            <div>
                <Contact />
                {
                reCAPTCHAError && 
                <div>
                    <p className="error">CAPTCHA ERROR</p>
                </div>
                }
            </div>
        )
}