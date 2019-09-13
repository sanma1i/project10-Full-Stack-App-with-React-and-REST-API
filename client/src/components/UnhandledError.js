import React from 'react';

const UnhandledError = () => {
    return (
        <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
            <button className="button button-primary btn-not-found" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>Back</button>
        </div>
    );
}

export default UnhandledError;