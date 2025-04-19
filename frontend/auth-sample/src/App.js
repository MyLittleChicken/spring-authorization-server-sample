import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Callback from './components/Callback';
import Profile from './components/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('loading');
  
  useEffect(() => {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    
    // 인증 코드가 있으면 콜백 페이지로
    if (code) {
      setCurrentPage('callback');
      return;
    }
    
    // 액세스 토큰이 있으면 프로필 페이지로
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setCurrentPage('profile');
      return;
    }
    
    // 그 외에는 로그인 페이지로
    setCurrentPage('login');
  }, []);
  
  // 페이지 렌더링
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login />;
      case 'callback':
        return <Callback />;
      case 'profile':
        return <Profile />;
      case 'loading':
        return <div>로딩 중...</div>;
      default:
        return <Login />;
    }
  };
  
  return (
    <div className="App">
      <header className="app-header">
        <h1>인증 샘플 애플리케이션</h1>
      </header>
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
