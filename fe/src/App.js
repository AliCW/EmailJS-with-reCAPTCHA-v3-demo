import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main.jsx';
import css from './App.css';


export default function App(){

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>

        </div>
    )

}