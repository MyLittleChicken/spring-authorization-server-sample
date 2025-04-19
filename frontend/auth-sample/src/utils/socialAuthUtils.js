/**
 * 소셜 로그인 관련 유틸리티 함수
 */

// 소셜 로그인 처리를 위한 함수
export const handleSocialLogin = (provider) => {
  // 직접 인증 서버의 소셜 로그인 엔드포인트로 리다이렉트
  window.location.href = `http://localhost:9000/oauth2/authorize/${provider}`;
};
