import React, { useState, useEffect } from 'react';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        
        if (!accessToken) {
          setError('로그인이 필요합니다');
          setLoading(false);
          return;
        }

        // 사용자 정보 엔드포인트 호출
        const response = await fetch('http://localhost:9000/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('사용자 정보를 가져오는데 실패했습니다');
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('프로필 정보 로딩 중 오류:', error);
        setError('사용자 정보를 가져오는데 실패했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    // 토큰 제거
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('code_verifier');
    
    // 홈으로 리다이렉트
    window.location.href = '/';
  };

  if (loading) {
    return <div className="profile-container">사용자 정보 로딩 중...</div>;
  }

  if (error) {
    return (
      <div className="profile-container">
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.href = '/'}>
          로그인 화면으로
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>사용자 프로필</h2>
      {userInfo && (
        <div className="user-info">
          <p><strong>ID:</strong> {userInfo.sub}</p>
          {userInfo.name && <p><strong>이름:</strong> {userInfo.name}</p>}
          {userInfo.email && <p><strong>이메일:</strong> {userInfo.email}</p>}
        </div>
      )}
      <button onClick={handleLogout} className="logout-button">
        로그아웃
      </button>
    </div>
  );
}

export default Profile;
