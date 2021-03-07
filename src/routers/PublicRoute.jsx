import { useUser } from 'context/UserProvider';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, path, ...rest }) => {
    const { user } = useUser();

    return (
        <Route
            {...rest}
            component={(props) => (
                user.isAuth ? (
                    <Redirect to="/join_room" />
                ) : (
                    <Component {...props} />
                )
            )}
        />
    );
}

export default PublicRoute;
