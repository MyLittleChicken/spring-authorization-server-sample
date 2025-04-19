package com.example.auth.service;

import com.example.auth.entity.OAuthClient;
import com.example.auth.repository.OAuthClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OAuthClientService {

    private final OAuthClientRepository repository;
    private final BCryptPasswordEncoder passwordEncoder;

    public RegisteredClient loadClientByClientId(final String clientId) {
        OAuthClient result = repository.findByClientId(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client not Found Exception: clientId: " + clientId));
        return loadClientByResult(result);
    }

    public RegisteredClient findByIdString (final String id) {
        Long longId = Long.valueOf(id);
        OAuthClient result = repository.findById(longId)
                .orElseThrow(() -> new IllegalArgumentException("Client not Found Exception: id: " + id));
        return loadClientByResult(result);
    }

    public List<String> getOriginUris() {
        return repository.findAll()
                .stream()
                .map(OAuthClient::getOriginUri)
                .collect(Collectors.toList());
    }

    private RegisteredClient loadClientByResult(final OAuthClient result) {
        return RegisteredClient.withId(result.getClientId())
                .clientId(result.getClientId())
                .clientSecret(passwordEncoder.encode(result.getClientSecret()))
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .redirectUri(result.getRedirectUri())
                .postLogoutRedirectUri(result.getPostLogoutRedirectUri())
                .scope(OidcScopes.OPENID)
                .scope(OidcScopes.PROFILE)
                .clientSettings (
                        ClientSettings.builder()
                                .requireAuthorizationConsent(result.isRequireAuthorizationConsent())
                                .build()
                ).tokenSettings(
                        TokenSettings.builder()
                                .accessTokenTimeToLive(
                                        Duration.ofSeconds(result.getAccessTokenTimeToLiveSeconds())
                                )
                                .refreshTokenTimeToLive(
                                        Duration.ofSeconds(result.getRefreshTokenTimeToLiveSeconds())
                                )
                                .build()
                ).build();
    }

}