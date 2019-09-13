import React from 'react';

const Forbidden = () => {
    return (
        <div className="bounds">
            <h1>Forbidden</h1>
            <p>Oh oh! You can't access this page.</p>
            <button className="button button-primary btn-not-found" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>Back</button>
        </div>
    );
}
export default Forbidden;