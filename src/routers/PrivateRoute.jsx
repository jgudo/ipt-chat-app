import { useUser } from 'context/UserProvider';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const { user } = useUser();

    return (
        <Route
            {...rest}
            component={(props) => (
                user.isAuth ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            )}
        />
    );
}

export default PrivateRoute;
