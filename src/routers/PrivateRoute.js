import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ isAuth, component: Component, path, ...rest }) => (
    <Route
        {...rest}
        component={(props) => (
            isAuth ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/" />
                )
        )}
    />
);

export default PrivateRoute;
