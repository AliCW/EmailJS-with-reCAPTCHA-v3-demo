import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import 'regenerator-runtime/runtime';
import emailjs from "@emailjs/browser";
import BarLoader from "react-spinners/BarLoader";
import toast, { Toaster } from 'react-hot-toast';
import { Checkmark } from 'react-checkmark';

export default function Contact({ props }){
    const [sending, setSending] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [address, setAddress] = useState("");
    const [reCAPTCHAError, setReCAPTCHAError] = useState(false);
    
    const reset = () => {
        window.location.reload();
    };

    const sendingFail = () => {toast('Email Sending Failed')};
    
    const sendEmail = (event) => {
        event.preventDefault();
        setSending(true);
        const emailObj = {
            "from_name": title,
            "message": body,
            "email": address
        };
        return axios.get("http://127.0.0.1:9090/api/send_email")
            .then(( { data } ) => {
                emailjs.send(
                    data[1].key,
                    data[2].key,
                    emailObj, {
                        publicKey: data[0].key,
                    },
                )
            })
            .then(() => {
                setSending(false);
                setSubmit(true);
            }).catch((err) => {
                setSending(false);
                sendingFail();
                console.error(err);
            });
    };

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
            {!submit && !reCAPTCHAError ? 
            <div>
                <form onSubmit={sendEmail}>
                    <textarea
                        id="title"
                        placeholder="Title / Subject"
                        rows="1"
                        className="email-title"
                        required
                        onChange={(event) => setTitle(event.target.value)}
                        style={{marginBottom: "5px"}}
                    ></textarea>
                        <br></br>
                    <textarea
                        id="message"
                        placeholder="Message"
                        rows="10"
                        className="email-body"
                        required
                        onChange={(event) => setBody(event.target.value)}
                        style={{marginBottom: "5px"}}
                    ></textarea>
                        <br></br>
                    <textarea
                        id="address"
                        placeholder="Email Address"
                        rows="1"
                        className="email-address"
                        required
                        onChange={(event) => setAddress(event.target.value)}
                        style={{marginBottom: "5px"}}
                    ></textarea>
                        <div>
                            <button className="submit-button">Send</button>
                            <Toaster toastOptions={{
                                "className": "toaster",
                            }}/>
                        </div>
                    <div>
                    {sending && 
                        <BarLoader 
                            className="loader"
                        />
                    }
                    </div>
                </form>
            </div>
                :
                submit && !reCAPTCHAError &&
            <div>
                <Checkmark size="225px" color="green" />
                <button 
                    onClick={reset} 
                    className="submit-button" 
                    style={{"marginTop": "20px"}}
                >Reset</button> 
            </div>}
            {
                reCAPTCHAError && 
                <div>
                    <p className="reCAPTCHA-error">CAPTCHA ERROR</p>
                </div>
            }
        </div>
    )
};