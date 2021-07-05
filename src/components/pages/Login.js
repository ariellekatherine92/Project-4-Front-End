import React from 'react';
import '../../App.css';
import LoginForm from '../Login';

export default function Login(props) {
  return (
    <>
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <div className="login-page">
        <LoginForm {...props} />
      </div>
    </>
  );
}