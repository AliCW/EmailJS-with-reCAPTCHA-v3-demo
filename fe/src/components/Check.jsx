import React, { useState, useEffect, useCallback } from 'react'
import Contact from "./Contact.jsx";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ClipLoader from "react-spinners/ClipLoader";

export default function Check() {
    const [token, setToken] = useState("");
    const [checking, setChecking] = useState(true);

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleReCaptchaVerify = useCallback(async () => {
        setChecking(true);
        if (!executeRecaptcha) {
          console.log('captcha awaiting execution');
          return;
        };
    
        const reCAPTCHAString = await executeRecaptcha();
        setToken(reCAPTCHAString);
        setChecking(false);
        
    }, [executeRecaptcha]);
      
    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    return (
      <div>
        <br></br>
        {checking 
        ? 
        <ClipLoader className="loader" />
        :
        <Contact props={token}/>
        }
        <br></br>

      </div>
    );
};
