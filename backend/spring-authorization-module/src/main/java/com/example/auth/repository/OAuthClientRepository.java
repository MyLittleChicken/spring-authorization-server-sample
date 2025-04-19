package com.example.auth.repository;

import com.example.auth.entity.OAuthClient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OAuthClientRepository extends JpaRepository<OAuthClient, Long> {
    Optional<OAuthClient> findByClientId(String clientId);
}
