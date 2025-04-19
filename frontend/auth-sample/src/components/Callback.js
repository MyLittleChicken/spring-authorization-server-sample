import React, { useEffect, useState } from 'react';
import { getCodeFromUrl, exchangeCodeForToken } from '../utils/authUtils';

function Callback() {
  const [status, setStatus] = useState('처리 중...');
  const [error, setError] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        // URL에서 인증 코드 가져오기
        const code = getCodeFromUrl();
        if (!code) {
          setError('인증 코드를 찾을 수 없습니다.');
          return;
        }

        // localStorage에서 코드 검증자 가져오기
        const codeVerifier = localStorage.getItem('code_verifier');
        if (!codeVerifier) {
          setError('코드 검증자를 찾을 수 없습니다.');
          return;
        }

        // 코드를 토큰으로 교환
        const tokenResponse = await exchangeCodeForToken(code, codeVerifier);
        
        // 토큰 저장 및 상태 업데이트
        localStorage.setItem('access_token', tokenResponse.access_token);
        localStorage.setItem('id_token', tokenResponse.id_token);
        localStorage.setItem('refresh_token', tokenResponse.refresh_token);
        
        setTokenInfo({
          accessToken: tokenResponse.access_token,
          tokenType: tokenResponse.token_type,
          expiresIn: tokenResponse.expires_in,
          scope: tokenResponse.scope,
        });
        
        setStatus('인증 성공!');
        
        // 홈으로 리다이렉트 (선택적)
        // setTimeout(() => window.location.href = '/', 2000);
      } catch (error) {
        console.error('콜백 처리 중 오류 발생:', error);
        setError('인증 처리 중 오류가 발생했습니다.');
      }
    };

    processCallback();
  }, []);

  return (
    <div className="callback-container">
      <h2>인증 처리 중</h2>
      {error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.href = '/'}>
            다시 시도
          </button>
        </div>
      ) : (
        <div className="success-message">
          <p>{status}</p>
          {tokenInfo && (
            <div className="token-info">
              <h3>토큰 정보</h3>
              <p>만료 시간: {tokenInfo.expiresIn}초</p>
              <p>스코프: {tokenInfo.scope}</p>
              <button onClick={() => window.location.href = '/'}>
                홈으로
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Callback;
