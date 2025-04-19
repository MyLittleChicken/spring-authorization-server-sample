/**
 * OAuth2 인증 유틸리티 함수
 */

// PKCE 챌린지 생성을 위한 함수
export const generateCodeChallenge = async (codeVerifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// 랜덤 코드 생성기
export const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  return text;
};

// 인증 URL 생성
export const buildAuthUrl = (codeChallenge) => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: 'public-linkrew',
    scope: 'openid profile',
    redirect_uri: 'http://127.0.0.1:3000',
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  return `http://localhost:9000/oauth2/authorize?${params.toString()}`;
};

// URL에서 코드 파라미터 추출
export const getCodeFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('code');
};

// 토큰 교환 함수
export const exchangeCodeForToken = async (code, codeVerifier) => {
  try {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: 'public-linkrew',
      redirect_uri: 'http://127.0.0.1:3000',
      code_verifier: codeVerifier,
      code: code,
    });

    const response = await fetch('http://localhost:9000/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error('토큰 교환 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('토큰 교환 중 오류 발생:', error);
    throw error;
  }
};
