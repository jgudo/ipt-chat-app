import React from 'react';

const PageNotFound = ({ history }) => {
    return (
        <div>
            <h1>Page Not Found</h1>
            <h5>The page you are looking for doesn't exist</h5>
            <button onClick={history.goBack}>Go Back</button>
        </div>
    );
};

export default PageNotFound;
