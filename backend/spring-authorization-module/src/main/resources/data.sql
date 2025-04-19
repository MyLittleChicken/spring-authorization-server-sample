-- RSA 키 생성을 위한 초기 데이터 삽입
INSERT IGNORE INTO `rsa_keys` (
    `key_id`,
    `identifier`,
    `public_key`,
    `private_key`
) VALUES (
    'auth-key-id',
    'identifier',
    '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'
);

-- OAuth 클라이언트 정보 삽입
INSERT IGNORE INTO `oauth_client` (
       `client_id`,
       `origin_uri`,
       `client_secret`,
       `redirect_uri`,
       `post_logout_redirect_uri`,
       `require_authorization_consent`,
       `access_token_ttl_seconds`,
       `refresh_token_ttl_seconds`
       ) VALUES (
       'spring-authorization-server',
       'http://127.0.0.1:3000',
       'spring-authorization-server',
       'http://127.0.0.1:3000/callback',
       'http://127.0.0.1:3000',
       false,
       1800,
       604800
);