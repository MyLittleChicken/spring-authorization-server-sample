package com.example.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "oauth_client")
public class OAuthClient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "client_id", unique = true, nullable = false)
    private String clientId;
    @Column(name = "origin_uri", nullable = false)
    private String originUri;
    @Column(name = "client_secret", nullable = false)
    private String clientSecret;
    @Column(name = "redirect_uri", nullable = false, length = 500)
    private String redirectUri;
    @Column(name = "authorization_grant_types", length = 500)
    private String authorizationGrantTypes; // 콤마로 구분된 인증 방식
    @Column(name = "access_token_ttl_seconds")
    private Integer accessTokenTimeToLiveSeconds; // 액세스 토큰 유효 시간(초)
    @Column(name = "refresh_token_ttl_seconds")
    private Integer refreshTokenTimeToLiveSeconds; // 리프레시 토큰 유효 시간(초)
    @Column(name = "post_logout_redirect_uri", nullable = false, length = 500)
    private String postLogoutRedirectUri;
    @Column(name = "require_authorization_consent", nullable = false)
    private boolean requireAuthorizationConsent;
}
