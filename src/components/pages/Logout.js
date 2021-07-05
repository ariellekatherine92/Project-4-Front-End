import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = props => {
    useEffect(() => {
        props.nowCurrentUser('');
        props.setIsAuthenticated(false);
    }, []);

    if (!props.user) {
        return (<Redirect to="/" />);
    }

    return (<span>Loging out...</span>);
};

export default Logout;
