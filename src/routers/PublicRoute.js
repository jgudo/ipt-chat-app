import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ isAuth, component: Component, path, ...rest }) => (
    <Route
        {...rest}
        component={(props) => (
            isAuth ? (
                <Redirect to="/join_room" />
            ) : (
                    <Component {...props} />
                )
        )}
    />
);

export default PublicRoute;
