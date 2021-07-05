import React from 'react';
import { Redirect } from 'react-router-dom';

const Profile = props => {
    if (!props.user) {
        return (<Redirect to="/login" />);
    }

    return (
        <div className="profile-page">
            <video src="/videos/video-1.mp4" autoPlay loop muted />
            <h3>{props.user.email}</h3>
        </div>
    );
};

export default Profile;
