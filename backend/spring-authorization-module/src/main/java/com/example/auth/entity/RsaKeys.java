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
@Table(name = "rsa_keys")
public class RsaKeys {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "key_id", unique = true, nullable = false)
    private String keyId;
    @Column(name = "identifier", unique = true, nullable = false)
    private String identifier;
    @Column(name = "public_key", nullable = false, length = 1024)
    private String publicKey;
    @Column(name = "private_key", nullable = false, length = 4096)
    private String privateKey;
}
