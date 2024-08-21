import React from "react";

export default function Contact(){


    const setTitle = (title) => {

    };

    const setBody = (body) => {

    }; 

    const setAddress = (address) => {

    };


    return (
        <div>
            <textarea
                id="title"
                placeholder="Title / Subject"
                rows="1"
                className="email-title"
                required
                onChange={(event) => setTitle(event.target.value)}
                style={{marginBottom: '5px'}}
            ></textarea>
            <br></br>
            <textarea
                id="message"
                placeHolder="Message"
                rows="10"
                className="email-body"
                required
                onChange={(event) => setBody(event.target.value)}
                style={{marginBottom: '5px'}}
            ></textarea>
            <br></br>
            <textarea
                id="address"
                placeHolder="Email Address"
                rows="1"
                className="email-address"
                required
                onChange={(event) => setAddress(event.target.value)}
                style={{marginBottom: '5px'}}
            ></textarea>
            <div>
                <button className="submit-button">Send</button>
            </div>
        </div>
    )
};