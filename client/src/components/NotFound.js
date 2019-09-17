// Component to render Not found page

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="bounds">
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
            <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
    );
}
export default NotFound;