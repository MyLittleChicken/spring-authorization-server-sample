# Spring Authorization Server 연동 React 샘플

이 프로젝트는 Spring Authorization Server와 연동하는 React 클라이언트 애플리케이션 샘플입니다.

## 주요 기능

- OAuth2 PKCE 인증 플로우 구현
- 사용자 로그인 및 프로필 정보 조회
- 토큰 관리 (저장, 사용, 로그아웃)

## 사용 기술

- React
- OAuth2 PKCE (코드 교환용 증명 키) 인증
- 로컬 스토리지를 활용한 토큰 관리

## 실행 방법

1. 의존성 설치:
```
npm install
```

2. 개발 서버 실행:
```
npm start
```

## 구성 요소

- **Login**: 인증 서버로 사용자 리다이렉트 처리
- **Callback**: 인증 코드를 토큰으로 교환
- **Profile**: 사용자 정보 표시 및 로그아웃 기능

## 주의사항

- Spring Authorization Server가 9000번 포트에서 실행 중이어야 합니다.
- 클라이언트 ID와 리다이렉트 URI가 서버 설정과 일치해야 합니다.
