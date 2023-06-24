package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {

	Optional<Store> findByEmailAndPassword(String email, String password);
	Store findByEmail(String email);

}
