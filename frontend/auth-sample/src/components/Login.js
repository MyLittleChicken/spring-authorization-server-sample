import React from 'react';
import { handleSocialLogin } from '../utils/socialAuthUtils';

function Login() {
  return (
    <div className="login-container">
      <h2>OAuth2 인증 샘플</h2>
      <p>Spring Authorization Server와 연동하는 React 애플리케이션</p>
      
      <div className="social-login-buttons">
        <button 
          onClick={() => handleSocialLogin('google')} 
          className="social-login-button google-button">
          구글로 로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
