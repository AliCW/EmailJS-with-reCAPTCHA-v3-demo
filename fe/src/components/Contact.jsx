import React, { useState } from "react";
import axios from "axios";
import 'regenerator-runtime/runtime';
import emailjs from "@emailjs/browser";
import BarLoader from "react-spinners/BarLoader";
import toast, { Toaster } from 'react-hot-toast';
import { Checkmark } from 'react-checkmark';

export default function Contact(){
    const [sending, setSending] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [address, setAddress] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    
    const reset = () => {
        window.location.reload();
    };

    const sendingFail = () => {toast('Email Sending Failed')};
    
    const sendEmail = (event) => {
        setTitleError(false);
        setBodyError(false);

        event.preventDefault();
        const emailObj = {
            "from_name": title,
            "message": body,
            "email": address
        };
        
        if(title.length < 4 || title.length > 41){
            setTitleError(true);
            return
        }
        if(body.length < 10 || body.length > 1000){
            setBodyError(true);
            return
        }
        if (address.includes('@') === false ||
            address.includes('.') === false ||
            address.includes(' ') === true) {
            setAddressError(true);
            return;
        };
        
        setSending(true);

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

    return (
        <div>
            {!submit ? 
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
                        placeholder="Reply Address"
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
                    {titleError &&
                        <div>
                            <p className="error">Email title must be between 4 & 40 characters long</p>
                        </div>    
                    }
                    {bodyError &&
                        <div>
                            <p className="error">Email body must be between 10 & 1000 characters long</p>
                        </div>    
                    }
                    {addressError &&
                        <div>
                            <p className="error">Address must be valid</p>
                        </div>
                    }
                    {sending && 
                        <BarLoader 
                            className="loader"
                        />
                    }
                    </div>
                </form>
            </div>
                :
                submit &&
            <div>
                <Checkmark size="225px" color="green" />
                <button 
                    onClick={reset} 
                    className="submit-button" 
                    style={{"marginTop": "20px"}}
                >Reset</button> 
            </div>}

        </div>
    )
};