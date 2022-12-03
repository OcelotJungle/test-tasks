import React, { createContext, useState } from 'react';
import Chat from './components/chat/';
import Login from './components/login';
import { useSelector } from "react-redux";
import { selectConnected } from './store/reducers/connection-reducer';
import './App.css';

export const WsContext = createContext();

export default function App() {
    const isConnected = useSelector(selectConnected);
    const [ws, setWs] = useState(null);
    
    return (
        <WsContext.Provider value={{ ws, setWs }}>
            <div id="content">
                { isConnected ? <Chat /> : <Login /> }
            </div>
        </WsContext.Provider>
    );
}
