import React from 'react';
import Columns from './Columns';
import '../styles/main.css';

function App() {
    return (
        <>
            <div className="sidebar"></div>
            <div className="topbar"> Lista zadań </div>
            <div className="columns">
                <Columns />
            </div>
        </>
    );
}

export default App;